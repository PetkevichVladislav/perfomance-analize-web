import React, { useEffect, useState } from 'react';
import '../Pages/MainPage/MainPage.scss';
import { Box } from '@mui/material';

const LOADER_TEXTS = [
  'Engaging warp drive for performance analysis',
  'Assembling Avengers for Lighthouse report',
  "Unleashing Superman's speed for web vitals check",
  'Calling upon Doctor Strange for performance insights',
  "Activating Iron Man's Jarvis for data analysis",
  'Hitching a ride on Millennium Falcon for faster load times',
  'Using the Force to optimize performance',
  'Beaming up Scotty for server response time',
  "Deploying Spiderman's web for network round trip time",
  'Calling upon Gandalf for First Contentful Paint',
  'Unleashing Hulk for heavy lifting in data parsing',
  "Using Harry Potter's Time-Turner for speed index",
  'Engaging hyperdrive for Time to Interactive',
  "Summoning Thor's lightning for quick server response",
  "Using Hermione's spells for efficient cache policy",
  "Calling upon Yoda's wisdom for performance audit",
  "Activating Black Panther's agility for First Input Delay",
  "Deploying Flash's speed for Largest Contentful Paint",
  'Using the TARDIS for time to first byte',
  'Summoning Aquaman for network payload size',
  "Engaging Star Trek's Data for data analysis",
  "Calling upon Wonder Woman's lasso for truth in metrics",
  "Using Frodo's determination for performance optimization",
  "Summoning Batman's tech for resource minification",
  "Activating Captain America's shield for security headers",
  "Deploying Green Lantern's light for server connection time",
  "Calling upon Aslan's roar for main thread work",
  'Using the Infinity Stones for total blocking time',
  'Summoning the X-Men for Cumulative Layout Shift',
  'Activating the Matrix for DOM size',
  'Calling upon the Guardians of the Galaxy for offscreen images',
  'Using the DeLorean for time to first contentful paint',
  'Summoning the Justice League for unused CSS',
  "Activating the Enterprise's warp speed for First CPU Idle",
  'Calling upon the Jedi for efficient encoding',
  'Using the One Ring for server response times',
  'Summoning the Avengers for unused JavaScript',
  'Activating the Starship Enterprise for render-blocking resources',
  'Calling upon the Hobbits for server backend latencies',
  'Using the Death Star for total byte weight',
  'Summoning the Sith for JavaScript execution time',
  'Activating the Batmobile for main-thread tasks',
  'Calling upon the Daleks for bootup time',
  'Using the Sonic Screwdriver for initial server response time',
  'Summoning the Cybermen for unused CSS rules',
  'Activating the TIE Fighter for network RTTs',
  'Calling upon the Time Lords for speed index',
  'Using the Lightsaber for first meaningful paint',
  'Summoning the Ewoks for efficient cache policy',
  'Activating the Millennium Falcon for time to interactive',
  'Calling upon the Vulcans for server response times',
  'Using the Phaser for render-blocking resources',
  'Summoning the Klingons for unused JavaScript',
  'Activating the Star Destroyer for main-thread tasks',
  'Calling upon the Wookiees for bootup time',
  'Using the Tricorder for initial server response time',
  'Summoning the Romulans for unused CSS rules',
  'Activating the X-Wing for network RTTs',
  'Calling upon the Stormtroopers for speed index',
  'Using the Transporter for first meaningful paint',
  'Summoning the Jedi for efficient cache policy',
  'Activating the Droids for time to interactive',
  'Calling upon the Sith for server response times',
  'Using the Force for render-blocking resources',
  'Summoning the Rebels for unused JavaScript',
  'Activating the Death Star for main-thread tasks',
  'Calling upon the Empire for bootup time',
  'Using the Holodeck for initial server response time',
  'Summoning the Borg for unused CSS rules',
  'Activating the Warp Drive for network RTTs',
  'Calling upon the Federation for speed index',
  'Using the Phaser for first meaningful paint',
  'Summoning the Tribbles for efficient cache policy',
  'Activating the Cloaking Device for time to interactive',
  'Calling upon the Cardassians for server response times',
  'Using the Replicator for render-blocking resources',
  'Summoning the Ferengi for unused JavaScript',
  'Activating the Deflector Shield for main-thread tasks',
  'Calling upon the Andorians for bootup time',
  'Using the Communicator for initial server response time',
  'Summoning the Bajorans for unused CSS rules',
  'Activating the Shuttlecraft for network RTTs',
  'Calling upon the Q for speed index',
  'Using the Tractor Beam for first meaningful paint',
  'Summoning the Orion for efficient cache policy',
  'Activating the Warp Core for time to interactive',
  'Calling upon the Gorn for server response times',
  'Using the Universal Translator for render-blocking resources',
  'Summoning the Tholians for unused JavaScript',
  'Activating the Photon Torpedoes for main-thread tasks',
  'Calling upon the Klingon Empire for bootup time',
  'Using the Starfleet for initial server response time',
  'Summoning the Dominion for unused CSS rules',
  'Activating the Holosuite for network RTTs',
  'Calling upon the Prophets for speed index',
  'Using the PADD for first meaningful paint',
  'Summoning the Maquis for efficient cache policy',
  'Activating the Runabout for time to interactive',
  'Calling upon the Vorta for server response times',
  'Using the Wormhole for render-blocking resources',
];

export const Loader: React.FC = () => {
  const [currentText, setCurrentText] = useState(LOADER_TEXTS[0]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentText(
        LOADER_TEXTS[Math.floor(Math.random() * LOADER_TEXTS.length)],
      );
    }, 1500);
  }, [currentText]);

  return <Box className="loader">{currentText}</Box>;
};
