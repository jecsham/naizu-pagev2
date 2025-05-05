const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const wikiDir = path.join(process.cwd(), 'wiki');
const outputDir = path.join(process.cwd(), 'src/app/wiki');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Process the wiki markdown files
function processWikiFiles() {
  console.log('Processing wiki files...');

  // Read all markdown files
  const files = fs.readdirSync(wikiDir).filter(file => file.endsWith('.md'));

  // Structure to hold all wiki data
  const wikiData = [];

  files.forEach(file => {
    const filePath = path.join(wikiDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    // Parse frontmatter and content using gray-matter
    const { data, content: markdownContent } = matter(content);

    const slug = path.basename(file, '.md');
    if (data.index === undefined) {
      throw new Error(`Index not found in ${file}`);
    }
    let index = data.index;
    let title = ''

    // Parse sections and subsections from markdown content
    const sections = [];
    let currentSection = null;

    // Simple parser for H2 (##) and H3 (###) headings
    const lines = markdownContent.split('\n');
    for (const line of lines) {
      const trimmedLine = line.trim();

      // Match H2 headings (##)
      if (trimmedLine.startsWith('## ')) {
        title = trimmedLine.substring(3).trim();
        id = title.toLowerCase().replace(/\s+/g, '-');

      } else if (trimmedLine.startsWith('### ')) {
        // Match H3 headings (###)
        const title = trimmedLine.substring(4).trim();
        const id = title.toLowerCase().replace(/\s+/g, '-');

        sections.push({
          id,
          title
        });
      }
    }

    // Store the processed data
    wikiData.push({
      slug,
      index,
      title: title || slug.charAt(0).toUpperCase() + slug.slice(1),
      sections,
    });

    // Write the content to the output directory without frontmatter
    const contentWithoutFrontmatter = markdownContent.replace(/---[\s\S]*?---/, '');
    const outputFilePath = path.join(outputDir, slug, 'page.md');
    const outputDirPath = path.dirname(outputFilePath);
    if (!fs.existsSync(outputDirPath)) {
      fs.mkdirSync(outputDirPath, { recursive: true });
    }
    fs.writeFileSync(outputFilePath, contentWithoutFrontmatter);
    console.log(`Processed ${file} -> ${outputFilePath}`);

  });

  // Write the processed data to a JSON file
  fs.writeFileSync(
    path.join(outputDir, '_wiki-data.json'),
    JSON.stringify(wikiData, null, 2)
  );

  console.log(`Processed ${Object.keys(wikiData).length} wiki files`);
}

// Run the processing
processWikiFiles();
