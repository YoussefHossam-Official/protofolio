// Reads Markdown files from content/ directory and parses frontmatter + body

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const config = require('../config');

const contentDir = config.paths.content;

/**
 * Returns an array of all blog posts with metadata + HTML content
 * Each post: { slug, title, date, excerpt, content (HTML) }
 */
function getAllPosts() {
  if (!fs.existsSync(contentDir)) return [];

  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(contentDir, file), 'utf-8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace('.md', ''),
        title: data.title || 'Untitled',
        date: data.date ? new Date(data.date).toISOString() : null,
        excerpt: data.excerpt || content.slice(0, 150) + '...',
        content: marked.parse(content),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // newest first
}

/**
 * Returns a single post by slug, or null if not found
 * @param {string} slug
 */
function getPostBySlug(slug) {
  const filePath = path.join(contentDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date ? new Date(data.date).toISOString() : null,
    excerpt: data.excerpt || content.slice(0, 150) + '...',
    content: marked.parse(content),
  };
}

module.exports = { getAllPosts, getPostBySlug };
