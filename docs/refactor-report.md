# Feature refactor report

## Final structure

All 37 production/experimental HTML pages have one canonical location under `frontend/features/<feature>/pages/`. Feature CSS and scripts are colocated with their owner. `frontend/shared/` contains the customer navigation/dashboard stylesheet and scripts reused across client pages. `frontend/index.html` points to the existing `newlanding_pg.html` experience.

| Feature | Canonical pages |
| --- | --- |
| Authentication | `login_pg.html`, `Registration_pg.html`, `admin_login.html`, `flip-auth.html` |
| Landing | `landing-dashboard.html`, `newlanding_pg.html`, `demo.html` |
| Admin | `admin-dashboard.html`, `admin-clients.html`, `admin-costing.html`, `admin-fabrics.html`, `admin-measurements.html`, `admin-orders.html`, `admin-reports.html`, `admin-settings.html` |
| Client dashboard | `Clnt_dashboad.html` |
| Measurements | `measurements.html`, `gemmeasure_body.html`, `gptmeasure_body.html` |
| Garments | `form1.html`, `blouse.html`, `blouse_design.html`, `kurti.html`, `womens_kurti.html`, `shirt.html`, `mens_shirt.html`, `suit.html`, `mens_suit.html`, `pant.html` |
| Orders | `orders.html`, `new_order.html`, `view-order.html` |
| Payments | `payments.html` |
| Profile | `profile.html` |
| Virtual try-on | `vr_try.html`, `handgest.html`, `demo2.html` |

`form1.html` is grouped with garments because it selects garment categories and links to garment pages. The two landing experiences stay distinct. Demo pages remain separate experiments.

## Styles and scripts

- Authentication, landing, and admin styles/scripts are under their feature folders.
- `style1.css` is with garments and is shared by garment pages and the garment category selector.
- `auth.js`, `Clnt_dashboad.js`, and `Clnt_dashboad.css` are in `frontend/shared/` because multiple client pages load them.
- Existing scripts were preserved as distinct files. Admin pages that referenced a missing `admin.js` now load the existing `admin-dashboard.js`.
- The client dashboard sidebar's old `vr_tryon.html` typo now points to the existing `vr_try.html` page.

## Serving and compatibility

`server.js` uses the already listed Express dependency to serve `frontend/` from `/`, with `frontend/index.html` as the entry page. `PORT` can override the default 8080. It redirects 37 original root-level page URLs to canonical feature pages while retaining query strings. Internal links use relative paths so they remain usable below a deployment path.

The package's start script now runs `node server.js`; dependencies and package lock versions were not changed. The AWS ECS workflow was preserved. It references a Docker build, but this repository has no Dockerfile and the workflow still contains placeholder deployment settings, so deployment was not verified.

There is no backend source or API router in this repository. Existing frontend requests still target `http://localhost:5000` (`/api/login`, `/api/register`, `/api/dashboard/:userId`, and `/orders`). Their service is outside this project's files and was not changed.

## Assets and unresolved source files

This repository contains no local image, video, font, GLB, or GLTF asset files. No files were copied from another project. Existing local references are organized to point to `frontend/assets/images/`, `videos/`, and `models/` while retaining their filenames. Missing referenced files include:

- Images: `logo.png`, `logo2.png`, `user_icon.avif`, `Login.jpg`, `background3.jpg`, `Clnt_dsh5.jpg`, `formal.avif`, `womens kurti.jpg`, `suit.jpg`, and `design2.jpg`.
- Videos: `bg.mp4`, `log.mp4`.
- Model: `human.glb`.

Those references were already unresolved in the source repository. The intended asset directories are documented but not created empty; add the original files when available.

## Verification

- Canonical page count: 37; root-level application HTML files remaining: 0.
- HTML local references scanned: 234 (including the new entry page). All page, stylesheet, and script targets resolve. 44 image/video references point to absent source assets listed above.
- CSS local asset references scanned: 5. All point to the absent `background3.jpg` source asset.
- Compatibility redirect map has 37 entries; each destination exists.
- `node --check` passed for the server and all seven frontend JavaScript files.
- `git diff --check` passed.
- A live HTTP smoke check was not completed because this environment blocks local socket connections (`EPERM`).
- Browser workflows and the AWS deployment workflow were not exercised. The project has no API implementation, local media assets, or Dockerfile. `npm test` remains the existing placeholder and was not run.
