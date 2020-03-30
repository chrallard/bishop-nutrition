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
      This is a food tracking app made specific for Dr. Bishops Weight Management clinic. It is meant to replace their current paper food tracking sheets. We have implemented not only food tracking, but also water, activity, mood and sleep tracking. We have worked hard to streamline the way their clients track their food intake with our quick select food tracking.
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

<!-- High-Level Architecture -->
## High-Level Architecture

 <img src="Images/high_level_arch.png" alt="High Level Architecture" height="500" width="auto">

Describe in brief about your high-level architecture.

<!-- Getting Started -->
## Getting Started
This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

* Yarn
```sh
brew install yarn
```
* Expo
```sh
npm install -g expo-cli
```

### Installation

1. Clone the repo
```sh
git clone https://github.com/alla0243/bishop-nutrition.git
```
2. Install Yarn packages
```sh
yarn install
```
3. Eject from the project directory
```sh
expo eject
```
4. When prompted in the terminal, select **Bare**, not ExpoKit.

5. When prompted in the terminal, type **sudo gem install cocoapods** if you haven’t installed cocoapods

6. Navigate to the **ios** folder within the project folder and install pods
```sh
pod install
```
7. Run app on ios
```sh
yarn ios
```
