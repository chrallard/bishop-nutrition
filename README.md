<!-- Team Logo -->

<p align="center">
      <img src="Images/infinite-studios-logo.png" alt="Team logo" height="auto" width="200">
      <h3 align="center">We are Infinite Studio</h3>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Features](#features)
* [Design](#design)
  * [User Research](#User-Research)
  * [Product Research](#Product-Research)
  * [Personas](#Personas)
  * [User Stories](#User-Stories)
  * [Information Architecture](#Information-Architecture)
  * [Paper Prototypes](#Paper-Prototypes)
  * [UI Wireframes](#UI-Wireframes)
  * [Visual Design](#Visual-Design)
  * [Interactive Visual Mockup](#Interactive-Visual-Mockup)
* [High-Level Architecture](#high-level-architecture)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)

<!-- ABOUT THE PROJECT -->
## About The Project

<img src="Images/4phones.png" alt="Team logo">

<p>
      Bishop Nutrition an app made specifically for Dr. Bishop's Weight Management Clinic. It is meant to replace their current paper food tracking sheets. We have implemented not only food tracking, but also water, activity, mood, and sleep tracking. We have worked hard to streamline the way their clients track their food intake with our quick select food tracking.
</p>

### Built With
* [React Native](https://reactnative.dev/)
* [Firebase](https://firebase.google.com/)

<!-- Features list -->
## Features
- [x] Food Tracking
- [x] Quick Select Tracking
- [x] Add food to favourites
- [x] Water Tracking
- [x] Sleep Tracking
- [x] Mood Tracking
- [x] Activity Tracking
- [x] Daily Log (shows completed or if user went over recommended amount of food)
- [x] Summary Screen showing daily, weekly, monthly progress (visual)
- [x] Line Graph showing weight progress
- [x] Update Password
- [x] Reset Password

<!-- Design -->
## Design

### User Research
Prior to our first meeting with Dr. Bishop’s team we performed an online questionnaire to get background on what people are currently doing in their weight loss journey.  We had 47 responses from various weight loss support groups on Facebook.

### Product Research
There are many health tracking and activity tracking apps available directly to users.  Since none of these have access to Dr. Bishop’s plans, they are not a direct competitor, however, many clients are using them as a substitute to the current pen and paper tracking method.  Some of the most popular apps clients are using are MyFitnessPal, Fitbit, Baritastic.

### Personas

### User Stories

### Information Architecture

### Paper Prototypes

### UI Wireframes

### Visual Design

### Interactive Visual Mockup

<!-- Technical Research -->
## Technical Research

The following document outlines the technical research results prior to the development stage of the project. The techlogies we investigated range from front end frameworks, data visualization tools, and database options.

https://docs.google.com/document/d/1tOJZMeHA1UNSjviJtnpPhF14Q_bjxfEq7NiJS2xbP_c/edit?usp=sharing

<!-- High-Level Architecture -->
## High-Level Architecture

 <img src="Images/high_level_arch.png" alt="High Level Architecture" height="500" width="auto">

We decided to build the app using React Native, with the help of Firebase on the backend. React Native allowed us to build out features using JavaScript and JSX, while still being able to run the app on a device 100% natively. Firebase was a great tool for what we needed. It provided the necessary authentication functionality as well as a document database where we could store user data, food plans, and a food list. Firebase also has a useful console that can be accessed and edited by the adminstrator of the app.

<!-- Getting Started -->
## Getting Started

### Prerequisites

These are the tools you will need to use the app.

* yarn
```sh
brew install yarn
```
* CocoaPods
```sh
sudo gem install cocoapods
```
* Xcode
Available on the Mac App Store.

### Installation

1. Clone the repo.
```sh
git clone -b native --single-branch https://github.com/alla0243/bishop-nutrition.git
```
2. Navigate into the folder.
```sh
cd bishop-nutrition
```
3. Install Yarn packages.
```sh
yarn install
```
4. Navigate into the ios folder.
```sh
cd ios
```
5. Install pod files. You may need to install cocoapods if you haven't before.
```sh
pod install
```
5. In Finder, navigate into the ios folder and open bishop_nutrition.xcworkspace.
6. Plug in your iPhone and select it in the device dropdown. You can also use a simulator.
7. In the menu bar, select Product -> Run.
8. The app should install and run on your device. You may need to trust the app in your iPhone's settings.


<!-- USAGE EXAMPLES -->
## Usage

<img src="Images/Dashboard.png" alt="Team logo" height="auto" width="204">    <img src="Images/Summary.png" alt="Team logo" height="auto" width="212">    <img src="Images/Progress.png" alt="Team logo" height="auto" width="200">      

<!-- ROADMAP -->
## Roadmap

List of Sprint two features (and known issues, if any).
- Activity tracking that pulls data from Fitbit API
- Ability to hide certain widgets on home screen
- View progress from specific days

<!-- Contact -->
## Contact

**Project Lead:** [Dylan Durbano](mailto:durb0004@algonquinlive.com)

**Technical Lead:** [Christian Allard](mailto:alla0243@algonquinlive.com)

**Design Lead:** [Jeff Lichty](mailto:lich0020@algonquinlive.com)

**Developer:** [Brinda Shah](mailto:shah0220@algonquinlive.com)

**Developer:** [Viraj Vashi](mailto:vash0006@algonquinlive.com)

**UX Designer:** [Conor Scott](mailto:scot0359@algonquinlive.com)

<!-- Acknowledgements -->
## Acknowledgements
Everyone at Infinite Studio would like the thank our Professors Su Cheng Lee and Adesh Shah for all their support throughout the design and development of Bishop Nutrition. They added a lot of great insight and mentorship towards the app and Infinite Studio team. We are forever grateful for their help in the development of Bishop Nutrition and help to further our knowledge. We'd also like to thank everyone at Dr. Bishop's Weight Management Clinic. Their support and positivity towards the team and development of Bishop Nutrition were truly wonderful. The Infinite Studio team is very grateful for this opportunity and will never forget all the support and dedication that went into this project. Thank you to everyone involved!
