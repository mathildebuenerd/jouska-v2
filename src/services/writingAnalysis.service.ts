import {TextAnalysisService} from "./textAnalysis.service";


export class WritingAnalysisService {

  colors: object;
  tempSentences: Array<string>;

  constructor(private textAnalysisService: TextAnalysisService) {
    this.colors = {
      "a5f31b": 8,
      "a4ed2b": 7,
      "a2e739": 6,
      "a1dc52": 5,
      "a1d16b": 4,
      "a1c087": 3,
      "a1b595": 2,
      "a1a69f": 1,
      "a39ba1": 0,
      "ae849b": -1,
      "b57794": -2,
      "c26185": -3,
      "cf4c74": -4,
      "db3863": -5,
      "e82551": -6,
      "f21542": -7,
      "fb0736": -8
    };
    this.tempSentences = ["", ""]; // on utilise cette variable pour optimiser l'usage de le fonction de traduction. On stocke la dernière phrase traduite dedans, et on checke ensuite chaque fois qu'une touche est pressée pour comparer et voir s'il y a un mot supplémentaire
  }

  startAssistance= () => {

    const textArea = <HTMLElement>document.querySelector('#smsContent');
    textArea.addEventListener('keyup', this.analyzeText); // keypress ne fontionne pas avec le clavier android, il faut utiliser keyup

    const sendButton = <HTMLElement>document.querySelector('#sendMessage');
    // sendButton.addEventListener('click', this.sendMessage);
  };

  public changeSidebar= (barSelector: string, score: number) => {
    // console.log(`bar selector`, barSelector);
    let sidebar = <HTMLElement>document.querySelector(`#${barSelector} .fill`);
    // console.log(`barselector:`, barSelector);
    sidebar.style.backgroundImage = `url(img/interface-components/jauges/jauge_${score}.png`;
  };

  public getColor= (object: object, value: number): string => {
    if (value > 8) {
      value = 8;
    } else if (value < -8) {
      value = -8;
    }
    return Object.keys(object).find(key => object[key] === value);
  };

  public getSidebarNumber(score: number) {
    // le score est usuellement un nombre entre -8 et 8
    // comme les jauges sont numérotées de 0 à 16, on commence en soustrayant 8
    let value = score+8;

    // ensuite, si les valeurs sont trop hautes ou trop basses, on égalise
    if (score > 8) {
      value = 8;
    } else if (score < -8) {
      value = -8;
    }

    return value;

  }

  getSentence= (): string => {

    const textArea = <HTMLElement>document.querySelector('#smsContent'); // c'est pas un textArea mais un bloc avec contenteditable
    const text = textArea.textContent;
    const allWords = new RegExp(/.+/, 'gim'); // récupère tous les mots
    const sentence = text.match(allWords);
    // const letters = new RegExp(/\S/, 'gi');

    // sentence[0] est parfois égal à plein d'espaces ('     '), pour être sûr qu'il y a bien du texte, on vérifie qu'il y ai une lettre
    // if (letters.test(sentence[0])) {
    // console.log(`sentence 0`, sentence[0]);
    return sentence[0]; // match renvoie un tableau de correspondances, mais avec la regex il n'est sensé renvoyer qu'un seul tableau
    // } else {
    //     console.warn(`sentence n'existe pas, elle est égale à ${sentence} et est de type ${typeof sentence}`);
    // }
  };

  showFeedback= (analysis: any, type: string) => {
    console.log(`showFeedback`, `analysis`, analysis, `type`, type);


    let score = 0;
    const otherAnalysis = ["psychopathy", "conscientiousness", "openness"];

    if (type === "polarity" || type === "selfishness") {
      if (analysis['score'] !== undefined) {
        score += analysis['score'];
      } else {
        for (const object in analysis) {
          // console.log(`score ${type}: ${analysis[object]['score']}`);
          score += analysis[object]['score'];
        }
      }
      // les analyses de la liste triad donnent directement le score
    } else if (otherAnalysis.indexOf(type) !== -1) {
      score = analysis;
    }

    // let color = this.getColor(this.colors, score);
    let scoreBar = this.getSidebarNumber(score);
    this.changeSidebar(type, scoreBar);

    // if (analysis["negative"].length > 0) {
    //     // this.animateNegativeWords(analysis["negative"]);
    // }
  };

  public analyzeText=() => {

    const language = 'fr';
    let sentence = this.getSentence();
    // console.log(`sentence`, sentence);


    if (sentence !== undefined) {
      // Analyses en français
      // sentence peut être undefined s'il y a trop peu de lettres
      const polarity = this.textAnalysisService.sentimentAnalysis(sentence, language);
      this.showFeedback(polarity, "polarity");
      const selfish = this.textAnalysisService.selfishnessAnalysis(sentence, language);
      this.showFeedback(selfish, "selfishness");

      // Analyses en anglais
      // Pour ces analyses, on traduit en anglais avant d'analyser
      // D'abord on récupère uniquement les mots entiers
      const ignoreLastWord = new RegExp(/.+[ !?,.:"]/, 'gim');
      // const test = sentence.split(" ");
      // console.log(`test: `, test);
      const allWordsExceptLast = sentence.match(ignoreLastWord); // match renvoie un tableau de correspondances, mais avec la regex il n'est sensé renvoyer qu'un seul tableau
      // console.log(`allwordsexc`, allWordsExceptLast);
      const wordsToAnalyze = String(allWordsExceptLast);

      this.tempSentences[1] = wordsToAnalyze;

      // Si ces deux valeurs sont différentes, c'est qu'il y a un mot de plus ou de moins
      if (this.tempSentences[1] !== this.tempSentences[0]) {
        // console.log(`c'est different`, this.tempSentences[1], this.tempSentences[0]);
        this.tempSentences[0] = wordsToAnalyze;

        console.log("wordsToAnalyze", wordsToAnalyze);

        // traduit la phrase, ce qui prend un peu de temps (promesse)
        // quand la phrase est traduite, on lance l'analyse
        if (wordsToAnalyze !== null) {
          this.textAnalysisService.translateToEnglish(wordsToAnalyze)
            .then((englishSentence) => {
              console.log(`la promesse semble réussir`);
              // console.log(`english sentence: ${englishSentence}`);
              const darktriad = this.textAnalysisService.darktriadAnalysis(englishSentence);
              console.log("darktriad", darktriad);

              // const bigfive = textAnalysis.personalityAnalysis(englishSentence);
              // console.log("bigfive", bigfive);

              const interpretationDarkriad = this.interpretAnalysis("darktriad", darktriad);
              // const interpretationBigfive = this.interpretAnalysis("bigfive", bigfive);
              // for (const trait in interpretation) {

              console.log("interpretationdark", interpretationDarkriad);
              // console.log("interpretationbigf", interpretationBigfive);
              // select criteria in psychopathy
              const traitDarktriad = "psychopathy";
              this.showFeedback(interpretationDarkriad[traitDarktriad].score, String(traitDarktriad));

              const traitBigfive = ["conscientiousness", "openness"];
              // for (let i=0; i<traitBigfive.length; i++) {
              //     // console.log(`intrepret`, traitBigfive[i]);
              //     const subkey = traitBigfive[i];
              //     this.showFeedback(interpretationBigfive[subkey].score, String(traitBigfive[i]));
              // }


            })
            .catch( err => console.log(err));
        }
      } else {
      }
    }
  };

  interpretAnalysis = (type: string, analysis: object): object => {

    let analyses = {};
    let analysesDark = {
      "triad": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "narcissism": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "machiavellianism": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "psychopathy": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
    };
    let analysesBigfive = {
      "openness": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "conscientiousness": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "extraversion": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "agreeableness": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
      "neuroticism": {
        "score": 0,
        "negativeWords": [],
        "positiveWords": []
      },
    };

    if (type === "darktriad") {
      analyses = analysesDark;
      for (const trait in analysis) {
        // on vérifie que le tableau contient bien quelque chose
        if (analysis[trait] !== []) {
          for (const word in analysis[trait]) {
            const _word = analysis[trait][word][0]; // correspond au mot (chaine de caractère)
            // console.log(`_word`, _word, `analysis`, analysis, `trait`, trait);
            const wordScore = analysis[trait][word][3]; // le quatrième élément correspond à la valeur relative du mot
            // si le score du mot est positif, ça veut dire que la darktriad est haute, donc c'est plutôt négatif. dans tous les cas on arrondi à 1 pour simplifier
            if (wordScore > 0) {
              analyses[trait].score--;
              analyses[trait].negativeWords.push(_word);
            } else {
              analyses[trait].score++;
              analyses[trait].positiveWords.push(_word);
            }
          }
        }
      }
    } else if (type === "bigfive") {
      analyses = analysesBigfive;
      for (const trait in analysis) {
        // on regarde si le tableau n'est pas vide
        if (analysis[trait].matches !== []) {
          for (let i = 0; i < analysis[trait].matches.length; i++) {
            const _word = analysis[trait].matches[i][0]; // correspond au mot (chaine de caractère)
            const wordScore = analysis[trait].matches[i][3]; // le quatrième élément correspond à la valeur relative du mot
            // si le score du mot est positif, ça veut dire que la darktriad est haute, donc c'est plutôt négatif. dans tous les cas on arrondi à 1 pour simplifier
            if (wordScore > 0) {
              analyses[trait].score--;
              analyses[trait].negativeWords.push(_word);
            } else {
              analyses[trait].score++;
              analyses[trait].positiveWords.push(_word);
            }
          }
        }
      }
    }



    // console.log(`analyses`, analyses);

    // on renvoie la score moyen, ainsi que les mots qui ont influencé globalement le score
    return analyses;
  };

  sliceWord(word: string, elmtClass: string): string {

    let tag = `<span class="${elmtClass}">`;
    for (let letter = 0; letter<word.length; letter++) {
      tag += `<span>${word[letter]}</span>`; // on ajoute chaque lettre entourée d'un span, comme ça on pourra les animer séparement
    }
    tag += `</span>`;
    return tag;
  }

  animateNegativeWords= (words: string[]) => {
    // console.log(`words:`);
    // console.log(words);
    const textArea = <HTMLElement>document.querySelector('#smsContent');
    for (const word in words) {
      let slicedWord = this.sliceWord(words[word], "negative");
      // console.log(`slicedWord:`);
      // console.log(slicedWord);
      // console.log(`textarea.value: ${textArea.textContent}`);
      const toReplace = new RegExp(`${words[word]}`, 'gi');
      textArea.innerHTML = (textArea.textContent).replace(toReplace, slicedWord);
    }

    const wordsToAnimate = document.querySelectorAll(`.negative`);
    if (wordsToAnimate !== undefined) {
      for (const singleWord in wordsToAnimate) {
        let lettersToAnimate = wordsToAnimate[singleWord].querySelectorAll(`span`);
        for (const letter in lettersToAnimate) {
          const aLetter = <HTMLElement>lettersToAnimate[letter];
          const randomValue = Math.floor(Math.random()*3);// on a trois animations différentes
          aLetter.style.animationName = `marionettes${randomValue}`;
        }
      }
    }

    // pour gérer les balises html dans contenteditable
    // https://stackoverflow.com/questions/41433796/html-elements-inside-contenteditable
    // const map = {amp: '&', lt: '<', gt: '>', quot: '"', '#039': "'"}
    // let html = textArea.innerHTML.replace(/&([^;]+);/g, (m, c) => map[c]);
    // textArea.innerHTML = html;

    // this.setEndOfContenteditable(textArea); // est sensé ramener le curseur à la fin de la ligne

  };

  setEndOfContenteditable= (contentEditableElement) => {
    let range,selection;
    range = document.createRange();//Create a range (a range is a like the selection but invisible)
    range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
    range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
    selection = window.getSelection();//get the selection object (allows you to change selection)
    selection.removeAllRanges();//remove any selections already made
    selection.addRange(range);//make the range you have just created the visible selection
  };

  // sendMessage= () => {
  //   const recipientElement = <HTMLInputElement>document.querySelector('#contactNumber');
  //   const recipient = recipientElement.value;
  //   const messageElement = <HTMLElement>document.querySelector('#smsContent');
  //   const message = messageElement.textContent;
  //   let confirmationMessage = document.querySelector('#confirmationMessage');
  //
  //   SMS.sendSMS(recipient, message, () => {
  //     console.log(`sms envoyé! destinaire: ${recipient}; message: ${message}`);
  //     recipientElement.value = "";
  //     messageElement.textContent = "";
  //     confirmationMessage.textContent = "Message correctement envoyé :)";
  //     setTimeout(() => {
  //       confirmationMessage.textContent = "";
  //     },3000);
  //
  //     // on remet le listener sur le bouton
  //     const sendButton = <HTMLElement>document.querySelector('#sendMessage');
  //     sendButton.addEventListener('click', this.sendMessage);
  //   }, (err) => {
  //     confirmationMessage.textContent = `Il y a eu une erreur, le message n'est pas parti...
  //           Erreur: ${err}`;
  //     throw err;
  //   });
  //
  // };

}
