const loadStylesheet = href => {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};
if (!location.pathname.endsWith('index.html') && location.pathname !== '/') loadStylesheet('inner.css');
const header = document.querySelector('.site-header');
document.querySelectorAll('.desktop-nav a[href="index.html#work"], .desktop-nav a[href="#work"]').forEach(link => link.remove());
document.querySelectorAll('.desktop-nav').forEach(nav => {
  if (!nav.querySelector('a[href="partner.html"]')) {
    const partnerLink = document.createElement('a');
    partnerLink.href = 'partner.html';
    partnerLink.textContent = 'Partner with us';
    nav.appendChild(partnerLink);
  }
  if (!nav.querySelector('a[href="insights.html"]')) {
    const insightsLink = document.createElement('a');
    insightsLink.href = 'insights.html';
    insightsLink.textContent = 'Insights';
    nav.appendChild(insightsLink);
  }
  if (!nav.querySelector('a[href="resources.html"]')) {
    const resourcesLink = document.createElement('a');
    resourcesLink.href = 'resources.html';
    resourcesLink.textContent = 'Resources';
    nav.appendChild(resourcesLink);
  }
});
loadStylesheet('enhancements.css');
loadStylesheet('ui.css');
loadStylesheet('contact-channels.css');
loadStylesheet('forms.css');
loadStylesheet('brand-updates.css');
loadStylesheet('responsive-fixes.css');
const siteUrl = 'https://www.jorovin.com';
const cleanPath = location.pathname.endsWith('index.html') ? '/' : location.pathname;
if (!document.querySelector('link[rel="canonical"]')) {
  const canonical = document.createElement('link');
  canonical.rel = 'canonical';
  canonical.href = siteUrl + cleanPath;
  document.head.appendChild(canonical);
}
const pageDescription = document.querySelector('meta[name="description"]')?.content || '';
[['og:type','website'],['og:site_name','Jorovin Limited'],['og:title',document.title],['og:description',pageDescription],['og:url',siteUrl + cleanPath],['og:image',siteUrl+'/assets/social-card.png'],['twitter:card','summary_large_image']].forEach(([property,content]) => {
  if (document.querySelector(`meta[property="${property}"], meta[name="${property}"]`)) return;
  const meta = document.createElement('meta');
  meta.setAttribute(property.startsWith('twitter:') ? 'name' : 'property', property);
  meta.content = content;
  document.head.appendChild(meta);
});
const organizationSchema = document.createElement('script');
organizationSchema.type = 'application/ld+json';
organizationSchema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'Organization','@id':siteUrl+'/#organization','name':'Jorovin Limited','url':siteUrl,'description':'Kenyan IT consultancy specializing in ERPNext, ERP implementation, POS, websites, mobile applications, ecommerce and SaaS platforms.','email':'sales@jorovin.com','telephone':'+254780182971','numberOfEmployees':{'@type':'QuantitativeValue','value':28},'areaServed':['Kenya','East Africa'],'contactPoint':[{'@type':'ContactPoint','contactType':'sales','email':'sales@jorovin.com','telephone':'+254780182971'},{'@type':'ContactPoint','contactType':'technical support','email':'support@jorovin.com'}]});
document.head.appendChild(organizationSchema);
if (!document.querySelector('link[rel="icon"]')) {
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/svg+xml';
  favicon.href = 'assets/favicon.svg';
  document.head.appendChild(favicon);
}
const articleBody = document.querySelector('.article-body');
if (articleBody) {
  const articleSchema = document.createElement('script');
  articleSchema.type = 'application/ld+json';
  articleSchema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'Article','headline':document.querySelector('h1')?.textContent.trim(),'description':pageDescription,'author':{'@type':'Organization','name':'Jorovin Limited','url':siteUrl},'publisher':{'@id':siteUrl+'/#organization'},'mainEntityOfPage':siteUrl+cleanPath,'dateModified':'2026-08-15'});
  document.head.appendChild(articleSchema);
}
const faqItems = [...document.querySelectorAll('.faq details')].map(item => ({'@type':'Question','name':item.querySelector('summary')?.textContent.trim(),'acceptedAnswer':{'@type':'Answer','text':item.querySelector('p')?.textContent.trim()}}));
if (faqItems.length) {
  const faqSchema = document.createElement('script');
  faqSchema.type = 'application/ld+json';
  faqSchema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'FAQPage','mainEntity':faqItems});
  document.head.appendChild(faqSchema);
}
const menuButton = document.querySelector('.menu-button');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 30));

menuButton.addEventListener('click', () => {
  const isOpen = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
document.getElementById('year').textContent = new Date().getFullYear();

const whatsapp = document.createElement('a');
whatsapp.className = 'whatsapp-float';
whatsapp.href = 'https://wa.me/254780182971?text=Hello%20Jorovin%20Limited%2C%20I%27d%20like%20to%20discuss%20a%20project.';
whatsapp.target = '_blank';
whatsapp.rel = 'noopener noreferrer';
whatsapp.setAttribute('aria-label', 'Chat with Jorovin on WhatsApp');
whatsapp.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a12.7 12.7 0 0 0-10.9 19.2L3.4 28.6l6.5-1.7A12.8 12.8 0 1 0 16 3Zm0 22.7c-2 0-3.9-.6-5.5-1.6l-.4-.2-3.8 1 1-3.7-.3-.4a10 10 0 1 1 9 4.9Zm5.5-7.5c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7 0-1.8-.9-3-1.7-4.2-3.8-.3-.5.3-.5.9-1.6.1-.2 0-.5 0-.7l-1-2.4c-.3-.6-.6-.5-.8-.5h-.7c-.2 0-.6.1-1 .5-1 1-.9 2.4-.8 2.7.1 1.4 1 2.8 1.2 3 1.3 2 3.2 3.6 5.4 4.5 2 .9 2.7 1 3.7.8 1.2-.2 2.1-.9 2.4-1.7.3-.8.3-1.5.2-1.7-.2-.2-.5-.3-.8-.5Z"/></svg><span>Chat with us</span>';
document.body.appendChild(whatsapp);

document.querySelectorAll('footer .footer-top').forEach(footerTop => {
  const contactBlock = document.createElement('div');
  contactBlock.className = 'footer-contact';
  contactBlock.innerHTML = '<strong>Get in touch</strong><a href="mailto:sales@jorovin.com">sales@jorovin.com</a><a href="mailto:support@jorovin.com">support@jorovin.com</a><a href="https://wa.me/254780182971" target="_blank" rel="noopener noreferrer">+254 780 182 971</a><div class="social-placeholders" aria-label="Social media links coming soon"><span title="LinkedIn link coming soon">in</span><span title="Facebook link coming soon">f</span><span title="Instagram link coming soon">◎</span><span title="X link coming soon">X</span><span title="TikTok link coming soon">♪</span></div>';
  footerTop.appendChild(contactBlock);
});
document.querySelectorAll('footer .footer-bottom').forEach(bottom => {
  if (!bottom.querySelector('.legal-links')) {
    const legal = document.createElement('span');
    legal.className = 'legal-links';
    legal.innerHTML = '<a href="privacy.html">Privacy</a><a href="terms.html">Terms</a>';
    bottom.appendChild(legal);
  }
});

const responsiveImages = {
  'assets/jorovin-consulting.png':['assets/jorovin-consulting-900.webp','assets/jorovin-consulting-1600.webp'],
  'assets/jorovin-team.png':['assets/jorovin-team-900.webp','assets/jorovin-team-1600.webp'],
  'assets/partner-client-visit.png':['assets/partner-client-visit-900.webp','assets/partner-client-visit-1600.webp'],
  'assets/partner-remote-team.png':['assets/partner-remote-team-900.webp','assets/partner-remote-team-1600.webp']
};
document.querySelectorAll('img').forEach(image => {
  const variants = responsiveImages[image.getAttribute('src')];
  if (!variants || image.closest('picture')) return;
  image.src = variants[1];
  image.srcset = `${variants[0]} 900w, ${variants[1]} 1600w`;
  image.sizes = '(max-width: 900px) 100vw, 80vw';
  image.loading = 'lazy';
  image.decoding = 'async';
});

const contactDetails = document.querySelector('.contact-details');
if (contactDetails) contactDetails.innerHTML = '<div><small>Sales</small><a href="mailto:sales@jorovin.com">sales@jorovin.com</a></div><div><small>Support</small><a href="mailto:support@jorovin.com">support@jorovin.com</a></div><div><small>WhatsApp</small><a href="https://wa.me/254780182971" target="_blank" rel="noopener noreferrer">+254 780 182 971</a></div><div><small>What we help with</small><span>ERPNext · Web · Mobile · POS · SaaS</span></div>';

const contactForm = document.getElementById('contact-form');
const WEB3FORMS_ACCESS_KEY = '7c8b38d6-8044-4e13-ad30-4b0e0abf8722';
if (contactForm) {
  const honeypot = document.createElement('input');
  honeypot.type = 'checkbox';
  honeypot.name = 'botcheck';
  honeypot.className = 'form-honeypot';
  honeypot.tabIndex = -1;
  honeypot.setAttribute('autocomplete', 'off');
  contactForm.appendChild(honeypot);

  const status = document.createElement('p');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  contactForm.appendChild(status);

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = event.currentTarget.querySelector('button');
    const originalText = button.innerHTML;
    status.className = 'form-status';
    status.textContent = '';
    if (WEB3FORMS_ACCESS_KEY.startsWith('REPLACE_')) {
      status.classList.add('is-error');
      status.textContent = 'The enquiry service is being configured. Please email sales@jorovin.com.';
      return;
    }

    button.disabled = true;
    button.textContent = 'Sending...';
    const formData = new FormData(event.currentTarget);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New website enquiry for Jorovin Limited');
    formData.append('from_name', 'Jorovin Website');

    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
      event.currentTarget.reset();
      status.classList.add('is-success');
      status.textContent = 'Thank you. Your enquiry has been sent to our sales team.';
      button.textContent = 'Enquiry sent';
    } catch (error) {
      status.classList.add('is-error');
      status.textContent = 'We could not send your enquiry. Please try again or email sales@jorovin.com.';
      button.disabled = false;
      button.innerHTML = originalText;
    }
  });
}
