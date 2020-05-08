import { admin } from "../init/init.firebase";
import { EnginSettings } from '../settings';


export const Settings = EnginSettings;



export function getRandomInt(minValue: number, maxValue: number) {
    const min = Math.ceil(minValue);
    const max = Math.floor(maxValue);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
}




/// @todo - Move to helper
export function userDoc(uid: string) {
    return admin().firestore().collection('user').doc(uid);
}



export function isAdmin(): boolean {
    
    return false;
}
