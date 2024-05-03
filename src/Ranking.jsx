import React from 'react';
import Card from './Card';
const images = require.context('./images', true);
const dataContext = require.context('./results', true);

function Ranking({ followers, trustworthiness, attractiveness, contentRelevancy, niche }) {
    const importAll = (context) => {
        let data = {};
        context.keys().forEach((key) => {
            const fileName = key.slice(2).split('.')[0];
            data[fileName] = context(key);
        });
        return data;
    };

    const jsonData = importAll(dataContext);
    const usernames = Object.keys(jsonData['engagement']);
    const Eng =  jsonData['engagement'];
    const Attr = jsonData['attr'];
    const Trust = jsonData['trust'];
    const Fol = jsonData['followers'];
    const CR = jsonData['class'];

    // Normalized weights received after BBN graph finding conditional probabilities

    const weightAttr = 0.2;
    const weightTrust = 0.2;
    const weightFol = 0.4;
    const weightCR = 0.2;

    // Extract min and max scores for followers, trustworthiness, attractiveness, and content relevancy
    const [minFollowerScore, maxFollowerScore ] = followers;
    const [minTrustworthinessScore, maxTrustworthinessScore ] = trustworthiness;
    const [minAttractivenessScore, maxAttractivenessScore ] = attractiveness;
    const [minContentRelevancyScore, maxContentRelevancyScore ] = contentRelevancy;


    console.log("33" , followers , minFollowerScore , maxFollowerScore)
    // Filter users based on followers, trustworthiness, attractiveness, and content relevancy
    const filteredUsernames = usernames.filter(username => {
        console.log(Fol[username])
        const isValid = Fol[username]*10 >= minFollowerScore
                        &&Trust[username]*10 >= minTrustworthinessScore && 
                        Attr[username]*10 >= minAttractivenessScore && 
                        CR[username + '.score']*10 >= minContentRelevancyScore &&
                        Fol[username]*10 <= maxFollowerScore   
                        &&Trust[username] *10<= maxTrustworthinessScore && 
                        Attr[username]*10 <= maxAttractivenessScore && 
                        CR[username + '.score']*10 <= maxContentRelevancyScore; 
        return isValid;
    });

   
    // Filter users based on niche
    const nicheFilteredUsernames = niche === 'all'
        ? filteredUsernames
        : filteredUsernames.filter(username => CR[username + '.class'] === niche);

    // Calculate total score for each user
    const userScores = nicheFilteredUsernames.map(username => {
        const totalScore = Math.floor(weightAttr * Attr[username] * Eng[username] +
                           weightTrust * Trust[username] * Eng[username] +
                           weightFol * Fol[username] * Eng[username] +
                           weightCR * CR[username + '.score'] * Eng[username]);
                        
        return { username, totalScore };
    });

    // Sort users based on total score
    userScores.sort((a, b) => b.totalScore - a.totalScore);
    console.log(filteredUsernames , nicheFilteredUsernames , userScores)
    return (
        <div>
            {/* Render users */}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {userScores.map((user, index) => {
                    const { username, totalScore } = user;
                    let imageSrc;
                    try {
                        // Try to load the image dynamically
                        imageSrc = images(`./${username}.jpg`);
                    } catch (error) {
                        // If an error occurs (image not found or other error), use a fallback image
                        imageSrc = images(`./${'medanishsharma_'}.jpg`);
                    }

                    return (
                        <Card key={index} username={username} image={imageSrc} atr={Attr[username]} trw={Trust[username]} fol={Fol[username]} cr={CR[username + '.score']} eng={"Score="+totalScore} rank={'#'+(index+1)}>
                            
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}

export default Ranking;
