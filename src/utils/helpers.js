function capitalize(word){
    return word.slice(0,1).toUpperCase() + word.slice(1);
};

export {capitalize};


function getAngles(){
    const angle1 = Math.floor(Math.random() * Math.floor(6));
    const angle2 = 100 - Math.floor(Math.random() * Math.floor(6));
    const angles =[];
    angles.push(angle1);
    angles.push(angle2);
    return angles;
}

export {getAngles}