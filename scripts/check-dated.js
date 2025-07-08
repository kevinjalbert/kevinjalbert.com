#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const CONFIG_PATH = path.join(__dirname, '../src/config/dated-content.json');

// Load configuration
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
const { ageBuckets } = config;

function getAllBlogPosts() {
  const posts = [];
  const directories = fs.readdirSync(BLOG_DIR);

  for (const dir of directories) {
    const dirPath = path.join(BLOG_DIR, dir);
    if (fs.statSync(dirPath).isDirectory()) {
      const files = fs.readdirSync(dirPath);
      const mdFile = files.find(file => file.endsWith('.md'));
      if (mdFile) {
        posts.push(path.join(dirPath, mdFile));
      }
    }
  }

  return posts;
}

function analyzePost(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter } = matter(content);

  const pubDate = new Date(frontmatter.pubDate);
  const ageInMonths = (Date.now() - pubDate.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
  const tags = frontmatter.tags || [];

  // Find matching buckets and shortest threshold
  const matchingBuckets = [];
  let shortestThreshold = Infinity;

  for (const bucket of ageBuckets) {
    const hasMatchingTags = tags.some(tag =>
      bucket.tags.some(bucketTag =>
        tag.toLowerCase().includes(bucketTag.toLowerCase())
      )
    );

    if (hasMatchingTags) {
      matchingBuckets.push(bucket);
      if (bucket.ageInMonths < shortestThreshold) {
        shortestThreshold = bucket.ageInMonths;
      }
    }
  }

  const wouldShowDisclaimer = shortestThreshold !== Infinity && ageInMonths >= shortestThreshold;

  return {
    title: frontmatter.title,
    pubDate: frontmatter.pubDate,
    ageInMonths: Math.round(ageInMonths * 10) / 10,
    tags,
    matchingBuckets,
    shortestThreshold: shortestThreshold === Infinity ? null : shortestThreshold,
    wouldShowDisclaimer,
    forceShow: frontmatter.forceShowDatedDisclaimer === true,
    forceHide: frontmatter.forceHideDatedDisclaimer === true,
    filePath
  };
}

function findUnusedTags() {
  const posts = getAllBlogPosts();
  const allPostTags = new Set();

  // Collect all tags used in posts
  for (const postPath of posts) {
    const content = fs.readFileSync(postPath, 'utf-8');
    const { data: frontmatter } = matter(content);
    const tags = frontmatter.tags || [];
    tags.forEach(tag => allPostTags.add(tag.toLowerCase()));
  }

  // Find bucket tags that aren't used
  const allBucketTags = new Set();
  ageBuckets.forEach(bucket => {
    bucket.tags.forEach(tag => allBucketTags.add(tag.toLowerCase()));
  });

  const unusedTags = Array.from(allBucketTags).filter(tag => !allPostTags.has(tag));
  return unusedTags.sort();
}

function findTagsNotInBuckets() {
  const posts = getAllBlogPosts();
  const allPostTags = new Set();

  // Collect all tags used in posts
  for (const postPath of posts) {
    const content = fs.readFileSync(postPath, 'utf-8');
    const { data: frontmatter } = matter(content);
    const tags = frontmatter.tags || [];
    tags.forEach(tag => allPostTags.add(tag.toLowerCase()));
  }

  // Get all bucket tags
  const allBucketTags = new Set();
  ageBuckets.forEach(bucket => {
    bucket.tags.forEach(tag => allBucketTags.add(tag.toLowerCase()));
  });

  // Find post tags that aren't in any bucket
  const unbucketedTags = Array.from(allPostTags).filter(tag => !allBucketTags.has(tag));
  return unbucketedTags.sort();
}

function main() {
  console.log('🔍 Dated Content Analysis Report');
  console.log('=' .repeat(50));
  console.log();

  const posts = getAllBlogPosts();
  const analyses = posts.map(analyzePost);

  // 1. Unused tags analysis
  console.log('📋 UNUSED BUCKET TAGS');
  console.log('-'.repeat(30));
  const unusedTags = findUnusedTags();
  if (unusedTags.length === 0) {
    console.log('✅ All bucket tags are being used in posts');
  } else {
    console.log(`❌ Found ${unusedTags.length} unused tags in buckets:`);
    unusedTags.forEach(tag => console.log(`   • ${tag}`));
  }
  console.log();

  // 1b. Tags not in buckets analysis
  console.log('🏷️  TAGS NOT IN BUCKETS');
  console.log('-'.repeat(30));
  const unbucketedTags = findTagsNotInBuckets();
  if (unbucketedTags.length === 0) {
    console.log('✅ All post tags are in buckets');
  } else {
    console.log(`📝 Found ${unbucketedTags.length} post tags not in any bucket:`);
    unbucketedTags.forEach(tag => console.log(`   • ${tag}`));
    console.log('\n💡 Consider adding these to appropriate buckets if they represent dateable content');
  }
  console.log();

  // 2. Posts by bucket analysis
  console.log('🪣 POSTS BY AGE BUCKET');
  console.log('-'.repeat(30));

  ageBuckets.forEach(bucket => {
    const postsInBucket = analyses.filter(post =>
      post.matchingBuckets.some(mb => mb.ageInMonths === bucket.ageInMonths)
    );

    console.log(`📦 ${bucket.ageInMonths} months (${bucket.tags.slice(0, 3).join(', ')}${bucket.tags.length > 3 ? '...' : ''})`);

    if (postsInBucket.length === 0) {
      console.log('   (no posts match this bucket)');
    } else {
      // Group by disclaimer status
      const showingDisclaimer = postsInBucket.filter(p => p.wouldShowDisclaimer || p.forceShow);
      const notShowingDisclaimer = postsInBucket.filter(p => !p.wouldShowDisclaimer && !p.forceShow);

      if (showingDisclaimer.length > 0) {
        console.log(`   📄 Showing disclaimer (${showingDisclaimer.length}):`);
        showingDisclaimer
          .sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate))
          .forEach(post => {
            const reason = post.forceShow ? '[FORCED]' : `${post.ageInMonths}mo old`;
            console.log(`      • "${post.title}" (${reason})`);
          });
      }

      if (notShowingDisclaimer.length > 0) {
        console.log(`   📝 Not showing disclaimer (${notShowingDisclaimer.length}):`);
        notShowingDisclaimer
          .sort((a, b) => new Date(a.pubDate) - new Date(b.pubDate))
          .forEach(post => {
            const reason = post.forceHide ? '[HIDDEN]' : `${post.ageInMonths}mo old`;
            console.log(`      • "${post.title}" (${reason})`);
          });
      }
    }
    console.log();
  });

  // 3. Manual overrides analysis
  console.log('⚙️  MANUAL OVERRIDES');
  console.log('-'.repeat(30));

  const forceShowPosts = analyses.filter(p => p.forceShow);
  const forceHidePosts = analyses.filter(p => p.forceHide);

  console.log('🔴 Force Show Disclaimer:');
  if (forceShowPosts.length === 0) {
    console.log('   (no posts with forceShowDatedDisclaimer)');
  } else {
    forceShowPosts.forEach(post => {
      const redundant = post.wouldShowDisclaimer ? ' [REDUNDANT - would show anyway]' : '';
      console.log(`   • "${post.title}" (${post.ageInMonths}mo old)${redundant}`);
    });
  }
  console.log();

  console.log('🟢 Force Hide Disclaimer:');
  if (forceHidePosts.length === 0) {
    console.log('   (no posts with forceHideDatedDisclaimer)');
  } else {
    forceHidePosts.forEach(post => {
      const preventing = post.wouldShowDisclaimer ? ' [PREVENTING auto-disclaimer]' : ' [not needed - wouldn\'t show anyway]';
      console.log(`   • "${post.title}" (${post.ageInMonths}mo old)${preventing}`);
    });
  }
  console.log();

  // 4. Summary statistics
  console.log('📊 SUMMARY STATISTICS');
  console.log('-'.repeat(30));
  console.log(`📝 Total posts: ${analyses.length}`);
  console.log(`⚠️  Posts showing disclaimer: ${analyses.filter(p => (p.wouldShowDisclaimer && !p.forceHide) || p.forceShow).length}`);
  console.log(`✅ Posts without disclaimer: ${analyses.filter(p => (!p.wouldShowDisclaimer && !p.forceShow) || p.forceHide).length}`);
  console.log(`🔴 Force show overrides: ${forceShowPosts.length}`);
  console.log(`🟢 Force hide overrides: ${forceHidePosts.length}`);
  console.log(`🏷️  Unused bucket tags: ${unusedTags.length}`);
  console.log(`📌 Unbucketed tags: ${unbucketedTags.length}`);

  const redundantForceShow = forceShowPosts.filter(p => p.wouldShowDisclaimer).length;
  if (redundantForceShow > 0) {
    console.log(`⚠️  Redundant force show flags: ${redundantForceShow}`);
  }

  console.log();
  console.log('💡 Run this script periodically to maintain your dated content system!');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzePost, findUnusedTags, findTagsNotInBuckets };
