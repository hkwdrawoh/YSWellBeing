# YS Well-Being

Welcome to YS Well-Being, a personalized web app for viewing individual health information and giving feedback on the medicine effectiveness for the Traditional Chinese Medicine (TCM) clinic Youseido in Quarry Bay, Hong Kong.

This demo shows the core functionalities offered by YS Well-Being. A live demo can be found [here](https://yswellbeing.howardwkh.pp.ua).

## Running locally

First, install dependencies:

```bash
npm install
```

Then, assuming you have a MagicBell account and have created a new project, obtain the NEXT_PUBLIC_MAGICBELL_API_KEY and MAGICBELL_API_SECRET from the [MagicBell](https://www.magicbell.com/) dashboard and set them as environment variables in a `.env` file at the root of this project:

```bash
NEXT_PUBLIC_MAGICBELL_API_KEY=...
MAGICBELL_API_SECRET=...
```

Then, start the development server:

```bash
next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

After visiting the resulting public url on your device, be sure to also install the app as a PWA, using the "Add to Home Screen" option in the Safari share menu. Detailed guide is shown in the website during installation.

## Functionalities

TBA...

## Credits

This project is based on a demo by [MagicBell](https://github.com/magicbell-io/webpush-ios-template/tree/main).

Special thanks to the following for the ideas and UI design:

- Crystal Cheang
- Hadrian Leung
- Natalie Chan
- Pail Hung
- Roger Lai