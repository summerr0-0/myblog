---
title: "How to Create Static Blog Using S3 and CloudFront"
date: "2024-12-17"
category: ["AWS", "S3", "Route 53", "CloudFront"]
---

# Setting Up a Static Blog with AWS Services

In this guide, I'll walk you through creating and deploying a static blog using AWS services. When you push changes to your main branch, GitHub Actions will automatically upload your content to Amazon S3 and distribute it through CloudFront's global content delivery network. This setup provides fast, secure, and reliable hosting for your static blog.

## Understanding the Architecture

Before we dive into the setup, let's understand how these services work together:
- Amazon S3 stores your blog's files
- CloudFront delivers your content globally with low latency
- Route 53 handles domain name management
- ACM provides SSL certificates for secure HTTPS connections
- GitHub Actions automates the deployment process

## Step 1: Setting Up Amazon S3 Storage

Amazon S3 (Simple Storage Service) will serve as the foundation of our blog, storing all our HTML, CSS, JavaScript, and media files.

### Creating the S3 Bucket
1. Sign in to the AWS Management Console and navigate to S3
2. Click "Create bucket" and configure:
   - Choose a unique bucket name (example: `my-static-blog`)
   - Select your preferred region
   - Block all public access (we'll use CloudFront for secure access)
   - Disable versioning (unless you need version control)
   - Keep default encryption settings

### Configuring Static Website Hosting
1. Select your newly created bucket
2. Go to the "Properties" tab
3. Find "Static website hosting" at the bottom
4. Click "Edit" and configure:
   - Enable static website hosting
   - Set index document to `index.html`
   - Save changes

## Step 2: Setting Up Access Permissions

We need to create an IAM user for GitHub Actions to securely deploy our blog.

### Creating IAM User
1. Navigate to IAM in AWS Console
2. Create a new user:
   - Name: Choose a descriptive name (example: `github-actions-deployer`)
   - Access type: Programmatic access
3. Attach these policies:
   - `AmazonS3FullAccess` for deploying to S3
   - `CloudFrontFullAccess` for cache invalidation
4. Save the access key ID and secret access key securely

## Step 3: Configuring GitHub Actions

GitHub Actions will automate our deployment process. Each time you push to main, it will build your blog and deploy it to AWS.

### Setting Up Secrets
1. Go to your GitHub repository's Settings
2. Navigate to Secrets and Variables → Actions
3. Add these secrets:
   - `AWS_ACCESS_KEY_ID`: Your IAM user's access key
   - `AWS_SECRET_ACCESS_KEY`: Your IAM user's secret key
   - `CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (we'll get this later)

### Creating the Workflow
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 22

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ap-northeast-2

      - name: Deploy to S3
        run: aws s3 sync ./out s3://your-bucket-name --delete

      - name: Invalidate CloudFront Cache
        run: |
          aws cloudfront create-invalidation --distribution-id ${{ secrets.CLOUDFRONT_DISTRIBUTION_ID }} --paths "/*"
```

## Step 4: Domain Management with Route 53

If you have a custom domain, we'll configure it with Route 53. Skip this step if you're using CloudFront's default domain.

### Setting Up DNS
1. Open Route 53 in AWS Console
2. Create a hosted zone:
   - Enter your domain name
   - Choose "Public hosted zone"
3. Note the nameservers AWS provides
4. Update your domain registrar's nameservers
5. Wait for DNS propagation (can take up to 48 hours)

## Step 5: SSL Certificate Setup

For secure HTTPS access, we need an SSL certificate from AWS Certificate Manager (ACM).

### Requesting a Certificate
1. Open ACM in the us-east-1 region
2. Request a public certificate:
   - Enter your domain name
   - Choose DNS validation
3. Create validation records in Route 53
4. Wait for validation (usually takes a few minutes)

## Step 6: CloudFront Distribution Setup

CloudFront will serve your blog content globally with low latency.

### Creating the Distribution
1. Open CloudFront console
2. Create new distribution:
   - Origin: Your S3 website endpoint
   - Origin access: Create new OAC
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Alternate domain: Your custom domain (if applicable)
   - SSL certificate: Select your ACM certificate
   - Price class: Choose based on your needs
3. Wait for deployment (about 10 minutes)
4. Note the distribution ID for GitHub Actions

### Final Steps
1. Test your CloudFront URL
2. Create Route 53 records pointing to CloudFront
3. Update GitHub Actions with your CloudFront distribution ID

## Maintenance and Updates

After setup, your blog will automatically deploy when you push to main. The workflow:
1. Push changes to GitHub
2. GitHub Actions builds your site
3. Files upload to S3
4. CloudFront cache invalidates
5. Changes appear on your site

Remember to monitor AWS costs, although for a typical blog they should be minimal.