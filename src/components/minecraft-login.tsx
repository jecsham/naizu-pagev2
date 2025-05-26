'use client';

import { useEffect, useState } from 'react';
import { Spinner } from './spinner';
import { useHash } from '@/hooks/useHash';
import { useRouter } from 'next/navigation';
import { getMcDataFromCookie, removeMcDataFromCookie, setMcDataToCookie } from '@/utils/cooki-manager';


export default function MinecraftLogin() {
  const [inputUsername, setInputUsername] = useState('');
  const [error, setError] = useState<boolean | null>(false);
  const [mcData, setMcData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [highligh, setHighlight] = useState(false);
  const hash = useHash();
  const router = useRouter();

  const handleLogOut = () => {
    removeMcDataFromCookie();
    setMcData(null);
  };

  const handleLogin = async () => {
    setError(false);
    setIsLoading(true);
    const data = await fetch(`/api/players/${inputUsername}`);

    if (!data.ok) {
      console.log('Error fetching data:', data);
      setError(true);
      setIsLoading(false);
      return;
    }

    const json = await data.json();

    if (!json || !json.success) {
      console.log('Error fetching data:', json);
      setError(true);
      setIsLoading(false);
      return;
    }
    let toMcData = { username: json.result.name, uuid: json.result.uuid, playedBefore: json.result.playedBefore };
    setMcData(toMcData);
    setMcDataToCookie(toMcData)
    setError(false);
    setIsLoading(false);
  };

  const handleInputChange = (e: any) => {
    setInputUsername(e.target.value);
  };

  const turnOffHighlight = () => {
    setHighlight(false);
    if (hash?.includes('login')) {
      router.replace('/store', { scroll: false });
    }

  };

  useEffect(() => {
    const mcData = getMcDataFromCookie();
    if (mcData) {
      setMcData(mcData);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (hash?.includes('login')) {
      setHighlight(true);
      let id = setTimeout(() => {
        turnOffHighlight();
      }, 6000);
      return () => {
        clearTimeout(id);
      };
    }
  }, [hash]);

  if (mcData?.username) {
    return (
      <div className="card w-full max-w-sm mb-12 flex">
        <div className="flex items-center w-full">
          <img
            draggable={false}
            src={`https://crafatar.com/avatars/${mcData.uuid}?overlay=true&size=48&default=MHF_Steve`}
            alt="Minecraft Avatar"
            className="rounded-md shadow-md"
          />
          <div className="text-left">
            <p className="text-xl ms-3 mb-0">{mcData.username}</p>
            {mcData?.username && !mcData?.playedBefore && (
              <p className="ms-3 text-sm text-gray-500 mb-0">Not seen on Naizu SMP</p>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <button className="mt-1 btn btn-danger btn-sm whitespace-nowrap" onClick={handleLogOut}>
            Log out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-full max-w-sm mb-12 text-left" id="login">
      <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Login</h2>
      <input
        type="text"
        placeholder="Minecraft Username"
        onChange={handleInputChange}
        onClick={() => turnOffHighlight()}
        disabled={isLoading}
        className={`${highligh ? 'border-2 border-red-500' : ''} input-text`}
        value={inputUsername}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            if (isLoading) return;
            handleLogin();
          }
        }}
        required
      />
      {highligh && (
        <p className="text-red-500 text-sm mt-2">Please log-in</p>
      )}
      <p className="text-sm text-gray-500 mt-2">This is required to receive your perks.</p>
      {error && <p className="text-red-500 text-sm mt-2">Error: Invalid username or player not found.</p>}
      <div className="flex justify-end">
        <button className="mt-1 btn btn-sm whitespace-nowrap" disabled={isLoading} onClick={() => handleLogin()}>
          {isLoading ? <Spinner /> : 'Continue'}
        </button>
      </div>
    </div>
  );
}
