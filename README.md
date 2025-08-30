# Image Changer Pop-up

An interactive pop-up component that cycles through a sequence of images with smooth transitions and a final message once the sequence ends.

## Overview

The pop-up is styled with customisable CSS variables and supports a responsive layout. Each button click advances through the image set until the final frame, where the button disappears and a message is displayed. Decorative UI elements such as close and shrink icons are included.

## Features

* Image sequence cycling with fade transitions
* Customisable background, colours, fonts, and text
* Mobile-responsive design
* Optional UI icons for close and shrink actions

## Project Structure

```
image-changer-popup/
├── assets/
│   ├── image-content/
│   │   ├── image-1.png
│   │   ├── image-2.png
│   │   ├── image-3.png
│   │   ├── image-4.png
│   │   ├── image-5.png
│   │   └── image-6.png
│   ├── close-icon.png
│   ├── favicon.png
│   ├── main-bg.png
│   └── shrink-icon.png
├── index.html
├── style.css
└── index.js
```

## Implementation Notes

* **HTML** defines the container and content elements.
* **CSS** manages theming, layout, transitions, and responsive behaviour using variables.
* **JavaScript** handles image sequencing and DOM updates.
* Assets (background, image sequence, icons) are stored in the `assets/` directory.

## Credits

Project idea inspired by [nasha-wanich].
