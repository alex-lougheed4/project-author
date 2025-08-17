# Production Deployment Guide

This guide walks you through deploying your app to production with proper environment separation.

## 🚀 Deployment Workflow

### 1. Prepare Production Environment

```bash
# Link to your production Supabase project
npm run db:prod YOUR_PROJECT_REF

# Or manually:
./scripts/supabase-setup.sh production YOUR_PROJECT_REF
```

### 2. Deploy Database Schema

```bash
# Push your migrations to production
npm run db:deploy

# Or manually:
./scripts/supabase-setup.sh deploy
```

### 3. Configure Environment Variables

Copy `env.production.example` to `.env.production` and update with your production values:

```bash
# Production environment
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### 4. Deploy Your Web App

#### Option A: Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

#### Option B: Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 🔄 Development vs Production Workflow

### Local Development
```bash
# Start local environment with sample data
npm run db:local

# Your app will use local Supabase at localhost:54321
npm run dev
```

### Production Deployment
```bash
# Link to production
npm run db:prod YOUR_PROJECT_REF

# Deploy schema changes
npm run db:deploy

# Deploy web app (Vercel handles this automatically)
```

## 📋 Environment Checklist

### Before Deploying to Production

- [ ] Database migrations are tested locally
- [ ] Environment variables are configured
- [ ] Production Supabase project is linked
- [ ] Schema is deployed to production
- [ ] Web app is configured for production

### After Deployment

- [ ] Verify app is accessible at production URL
- [ ] Test authentication flows
- [ ] Verify database connections
- [ ] Check error monitoring
- [ ] Test all major features

## 🛠️ Troubleshooting

### Common Issues

#### "Project not linked"
```bash
# Re-link to production
npm run db:prod YOUR_PROJECT_REF
```

#### "Migration failed"
```bash
# Check migration status
npm run supabase:status

# Pull latest schema
supabase db pull
```

#### "Environment variables missing"
- Verify `.env.production` exists
- Check Vercel environment variables
- Ensure all required variables are set

### Getting Help

1. Check Supabase status: `npm run supabase:status`
2. Review migration logs: `supabase migration list`
3. Check Supabase dashboard for errors
4. Verify environment configuration

## 🔒 Security Considerations

### Production Security

- Never commit `.env.production` to git
- Use strong, unique API keys
- Enable Row Level Security (RLS) policies
- Monitor database access logs
- Regular security audits

### Environment Isolation

- Local development uses local Supabase
- Production uses remote Supabase
- No data crossover between environments
- Separate API keys for each environment

## 📊 Monitoring

### Production Monitoring

- Supabase dashboard metrics
- Application error tracking
- Database performance monitoring
- User activity analytics
- API usage statistics

## 🚀 Continuous Deployment

### Automated Workflow

1. **Development**: Work locally with `npm run db:local`
2. **Testing**: Test changes locally
3. **Commit**: Push to GitHub
4. **Deploy**: Vercel automatically deploys
5. **Database**: Run `npm run db:deploy` when schema changes

### Branch Strategy

- **Main branch**: Production deployment
- **Feature branches**: Local development
- **Staging**: Optional staging environment

## 📝 Best Practices

1. **Always test locally first** with `npm run db:local`
2. **Use migrations** for all database changes
3. **Keep environments separate** - never mix local and production
4. **Monitor production** after deployments
5. **Backup before major changes**
6. **Document all environment-specific configurations**

---

For more help, check the [Supabase documentation](https://supabase.com/docs) or your project's README. 