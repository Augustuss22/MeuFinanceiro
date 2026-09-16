# Meu Financeiro

Projeto independente: Supabase + GitHub + Cloudflare Pages.

1. Crie um projeto novo no Supabase.
2. Execute `schema.sql` no SQL Editor.
3. Cole Project URL e Publishable/anon key em `js/config.js`.
4. Crie um repositório GitHub separado e envie os arquivos.
5. No Cloudflare: Workers & Pages > Create > Pages > Connect to Git > escolha o repositório.
6. Branch: main. Build command: `exit 0`. Output directory: `.`.
7. No Supabase Authentication > URL Configuration, coloque o endereço final do Cloudflare como Site URL.
8. Nunca coloque service_role/secret key no frontend.
