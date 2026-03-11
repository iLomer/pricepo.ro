# Custom Domain Configuration -- prevo.ro

Checklist for connecting the prevo.ro domain to the Vercel deployment.

## 1. Add Domain to Vercel

1. Go to Vercel project > **Settings > Domains**
2. Add domain: `prevo.ro`
3. Add domain: `www.prevo.ro`
4. Set redirect: `www.prevo.ro` redirects to `prevo.ro` (recommended)

## 2. Configure DNS Records

In your domain registrar's DNS management panel, add the records Vercel specifies. Typically:

### For apex domain (prevo.ro)

| Type | Name | Value |
|---|---|---|
| A | @ | `76.76.21.21` |

### For www subdomain

| Type | Name | Value |
|---|---|---|
| CNAME | www | `cname.vercel-dns.com` |

**Note:** Vercel may show different values. Always use the exact values shown in the Vercel dashboard after adding the domain.

## 3. Wait for DNS Propagation

- DNS propagation can take up to 48 hours, but typically completes within 1-2 hours
- Check propagation status at [dnschecker.org](https://dnschecker.org)

## 4. SSL Certificate

- Vercel automatically provisions and renews SSL certificates via Let's Encrypt
- No manual action required
- Certificate should be active within minutes of DNS propagation

## 5. Verify

- [ ] `https://prevo.ro` loads the landing page
- [ ] `https://www.prevo.ro` redirects to `https://prevo.ro`
- [ ] `http://prevo.ro` redirects to `https://prevo.ro`
- [ ] SSL certificate is valid (padlock icon in browser)
- [ ] All pages load correctly (landing, auth, dashboard)

## 6. Update Supabase Auth Redirect URLs

After domain is active, verify in Supabase dashboard:

1. Go to **Authentication > URL Configuration**
2. Confirm **Site URL** is set to `https://prevo.ro`
3. Confirm **Redirect URLs** includes:
   - `https://prevo.ro/auth/callback`
   - (Keep `http://localhost:3000/auth/callback` for local development)

## Notes

- Subdomain configuration (e.g., `app.prevo.ro`) is out of scope for now
- Email DNS records (SPF, DKIM, DMARC) are not needed yet -- configure when custom email sending is set up
