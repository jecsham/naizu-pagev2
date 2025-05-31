
## Land Protection

Protect your builds and items from other players by claiming land. Learn how to protect your property and manage access for trusted friends.

### Notes

- Each player start with a limit of **4** chunks. It will increase automatically as you play. We do this to prevent land-grabbing.
- You can claim land in the **Overworld** only.
- The chunk cap is **50**. We may increase this limit in the future.
- You can create up to **5** groups. Additionally, there will be a default group for guid members.

### Commands

Available commands of land protection.

#### Chunk Management

- `/chunk` - Open the chunk management menu. There you can manage your claimed chunks and groups.
- `/chunk claim` - Claim the chunk you are currently standing in.
- `/chunk unclaim` - Unclaim the chunk you are standing in.

#### Chunk Information
- `/chunk owner` - Show the owner of the chunk you are standing in.

#### Chunk Groups
Use groups to manage members in multiple chunks at once.

> Note: The group system is currently in beta. Please report any issues you encounter.

- `/chunk` - Open the chunk management menu. From there you can manage your groups as well.

- `/chunk group create <groupName>` - Create a new group with the given name.
- `/chunk group delete <groupName>` - Delete the group with the given name.

- `/chunk group player add <player> <groupName>` - Add a player to the group.
- `/chunk group player remove <player> <groupName>` - Remove a player from the group.

- `/chunk group assignto <groupName>` - Add the chunk you are currently standing in to a group.
- `/chunk group removefrom <groupName>` - Remove the chunk you are currently standing in from a group.

#### Manage Trusted Members
> Note: This method is disabled. Please use the new group system to manage members in your claimed chunks.

- `/chunk trust <player>` - Trust a player in the chunk you are standing in.
- `/chunk untrust <player>` - Trust a player in the chunk you are standing in.

For additional commands, use `/chunk help`.
