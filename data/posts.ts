export const posts = [
  {
    id: 1,
    slug: "berlin-start-der-reise",
    kind: "audio",
    title: "Berlin – Start der Reise",
    date: "2026-04-10",
    location: "Berlin",
    coords: { lat: 52.52, lng: 13.405 },
    text: "Heute beginnt alles. Ich stehe am Bahnhof und weiß nicht genau, was kommt.",
    content: `
Die Reise beginnt in Berlin.

Noch ist alles vertraut. Aber genau das wird sich ändern.
Ich nehme nur das Nötigste mit und versuche, offen zu bleiben für das, was kommt.
    `,
    images: [
      "/images/berlin.jpg",
      "/images/berlin2.jpg",
      "/images/berlin3.jpg",
    ],
    audio: "/audio/berlin.mp3",
    audioTitle: "Audioaufnahme · Am Pariser Platz",
    transcriptSegments: [
      {
        time: 0,
        text: "Es ist der Anfang dieser Reise.",
      },
      {
        time: 6,
        text: "Noch ist alles vertraut, aber genau das wird sich bald verändern.",
      },
      {
        time: 13,
        text: "Ich stehe hier und merke, dass der erste Schritt immer der schwerste ist.",
      },
    ],
  },
  {
    id: 2,
    slug: "warschau-erste-station",
    kind: "photo",
    title: "Polen – Erste Station",
    date: "2026-04-12",
    location: "Warschau",
    coords: { lat: 52.2297, lng: 21.0122 },
    text: "Die Stadt ist laut, lebendig und voller Energie.",
    content: `
Warschau ist mein erster längerer Halt.

Noch bin ich nicht angekommen, aber ich bin schon unterwegs.
    `,
    images: [
      "/images/warschau.jpg",
      "/images/warschau2.jpg",
      "/images/warschau3.jpg",
    ],
    audio: "/audio/warschau.mp3",
    audioTitle: "Audioaufnahme · Unterwegs in Warschau",
    transcriptSegments: [
      {
        time: 0,
        text: "Die Straßen sind laut, die Stadt bewegt sich ununterbrochen.",
      },
      {
        time: 7,
        text: "Ich höre mehr, als ich verstehe.",
      },
    ],
  },
];