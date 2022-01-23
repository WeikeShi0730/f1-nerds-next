This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production

The production code is hosted at vercel:
[https://f1-nerds-next.vercel.app/](https://f1-nerds-next.vercel.app/)

### Introduction

This repo is the frontend code, developed using the Next.js framework.

Data is fetched from public APIs: [ergast API](https://ergast.com/mrd/) & [FastF1](https://theoehrly.github.io/Fast-F1/legacy.html)

The second one is a library written in Python. To access data in that library, a Flask backend is created to extract and process the data. API endpoints are created in the backend code, so the frontend could make API calls to the endpoints to access data. Backend code could be found at [Backend repo](https://github.com/WeikeShi0730/f1-nerds-flask)

### Usage

This web app is for F1 nerds who are not satisfied with only watching the live stream, and they need some more data to have a better understanding of what's going on the track!

Now it supports all races data since 2018. So go ahead select a year, Grand Prix weekend, session, drivers, and laps of your interest.

The graphs will show drivers' session details of each lap time and tire compounds.

Also, the telemetry data shows more detailed info for each lap, such as speed, RPM, throttle, brake, gear, and DRS. They will help you understand how the driver is doing in a specific lap.

You can also select laps from different years, Grand Prix, sessions, and drivers to have a more comprehensive comparison between several laps.

Enjoy!
