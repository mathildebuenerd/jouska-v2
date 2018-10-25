This repo is the new version of the [jouska](https://github.com/mathildebuenerd/jouska) app, build with Ionic.


# Jouska

_(français en dessous)_

> _n._ a hypothetical conversation that you compulsively play out in your head—a crisp analysis, a cathartic dialogue, a devastating comeback—which serves as a kind of psychological batting cage where you can connect more deeply with people than in the small ball of everyday life, which is a frustratingly cautious game of change-up pitches, sacrifice bunts, and intentional walks. \
[_The Dictionary of Obscure Sorrows_](http://www.dictionaryofobscuresorrows.com/post/24567910939/jouska)


## Description

Jouska is an Android mobile app that allows people to quantify the way they talk.

By allowing users to have a better understanding of the way they talk, the app train them to read between the lines of one of the others. This way, they can develop a form of immunity at targeted solicitations from advertisers, politicians, or noxious relations. The project is complemented by [a video](https://vimeo.com/276232389) showing how, by a better understanding of the hidden mechanics of sentiment analysis, people could be less a prey for ill-intentioned politicians or journalists. How they could reclaim a technology that is currently massively use against them (let's think about fact-free politics for example). At the same time, it asks the question: with all these technologies focusing on language and emotions, will everyone become more manipulative and manipulable?

The app analyzes the valence of the user’s text messages, and gives clues about the contacts who are the most positive and the most negative. It compares the positivity of the messages sent and received, in order to see if there’s a loss of balance between the two people’s writing. It also looks at the personality of these contacts, to show which kind of personality is the most compatible with the user. Finally, it looks at the positivity of the messages depending on the weekdays/hours they were sent, in order, for example, to recommend people to avoid sending messages on certain days/hours, or on the contrary, to nudge them to do so.

![Jouska - App interfaces (c) Mathilde Buenerd](http://www.chilidesign.fr/jouska/jouska_interfaces_mathilde_buenerd.png)

The app also contains an interactive writing interface, which gives in real time an emotional feedback.

<img src="http://www.chilidesign.fr/jouska/jouska_writing_interface_mathilde_buenerd.gif" alt="Jouska - Writing interface (c) Mathilde Buenerd" width="400" style="border: 1px solid #ddd;">


## Plugins used
As sentiment analysis is far more developed for the English language, all text messages are translated to English before being analyzed.

Then, several text analysis are done :
- Positivity/Negativity with [node-sentiment](https://www.npmjs.com/package/node-sentiment) + a custom emoji recognition.
- Dark Triad with [darktriad](https://www.npmjs.com/package/darktriad) ([P. Hughes](https://www.phugh.es/))
- Big Five personality traits with [bigfive](https://www.npmjs.com/package/bigfive) ([P. Hughes](https://www.phugh.es/))

## Scientific papers
- Preotiuc-Pietro D. and al., [Studying the Dark Triad of Personality through Twitter Behavior](http://wwbp.org/papers/darktriad16cikm.pdf)
- Park G. and al., [Living in the Past, Present, and Future: Measuring Temporal Orientation With Language](https://static1.squarespace.com/static/53d29678e4b04e06965e9423/t/59398fb65016e1df4890b9e6/1496944566862/temporalPark2016.pdf)
- Park G, and al., [Automatic Personality Assessment Through Social Media Language](https://static1.squarespace.com/static/53d29678e4b04e06965e9423/t/54bd3fd2e4b0bd77452d4116/1421688786115/2014_automaticPersonalityAssessment.pdf)

## Context
Jouska is a master's project made at HEAD - Geneva, Media Design master. The project has two parts: the former is the app presented here. \
The second is [a speculative video](https://vimeo.com/276232389) imagining the future implication of the daily use of sentiment analysis. The video takes place in a near future, in which the app allows its users to have a better understanding of the way they talk, and in the end, of one of the others. This way, they develop a form of immunity at targeted solicitations from advertisers, politicians, or noxious relations.

-----

## Description
Quantified Talk est une application de messagerie Android pour quantifier ses habitudes verbales.

L'application analyse les sentiments des SMS reçus, et peut ainsi déceler les contacts les plus positifs et les plus négatifs. Elle analyse aussi les SMS envoyés, de manière à identifier les jours de la semaine et moments de la journée durant lesquels l'usager est le plus positif.

Enfin, l'application possède une interface d'écriture de SMS interactive, qui permet d'analyser en temps réel la qualité des messages que l'usager s'apprête à envoyer, et ainsi lui conseiller des pistes de changement.

## Fonctionnement et plugins
L'analyse de sentiment étant largement plus développée pour la langue anglaise que les autres langues, tous les SMS sont traduits vers l'anglais avant d'être analysés.

Plusieurs analyses de texte sont ensuite effectuées :
- Positivité/Négativité avec [node-sentiment](https://www.npmjs.com/package/node-sentiment) + a custom emoji recognition.
- Triade noire avec [darktriad](https://www.npmjs.com/package/darktriad)
- Big Five (personnalité) avec [bigfive](https://www.npmjs.com/package/bigfive)

