import { Injectable } from "@angular/core";

import { Item } from "~/item/item";

export enum ItemName{
    SELF_CURE = 1,
    SEASONAL_PROBLEM = 2,
    FIRST_AID = 3,
    GRANNY_TIPS = 4,
    CONTACT_DOCTOR = 5,
    NEAREST_HELP = 6
}

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        {
            id: 1, name: "Self Cure", path: "~/images/pic_selfcure.png", 
            description: "Self cure will provide you with description of problem, its causes, possible symptoms, things you can can do to avoid it, and also most importantly things which you can do to cure it easily at home.",
            subitems: [
                { id: 1, name: "Acidity", path: "~/images/SelfCure/Acidity.png", subitems: null },
                { id: 2, name: "Intestinal Worms", path: "~/images/SelfCure/Intestinal_Worms.png", subitems: null },
                { id: 3, name: "Gastritis", path: "~/images/SelfCure/Gastritis.png", subitems: null },
                { id: 4, name: "Mouth Ulcers", path: "~/images/SelfCure/Mouth_Ulcers.png", subitems: null },
                { id: 5, name: "Acne", path: "~/images/SelfCure/Acne.png", subitems: null },
                { id: 6, name: "Eczema", path: "~/images/SelfCure/Eczema.png", subitems: null },
                { id: 7, name: "Age spots", path: "~/images/SelfCure/Age_spots.png", subitems: null },
                { id: 8, name: "Gas/Flatulence", path: "~/images/SelfCure/Gas.png", subitems: null },
                { id: 9, name: "Obesity", path: "~/images/SelfCure/Obesity.png", subitems: null },
                { id: 10, name: "Common Cold", path: "~/images/SelfCure/Common_Cold.png", subitems: null },
                { id: 11, name: "Sinusitis", path: "~/images/SelfCure/Sinusitis.png", subitems: null },
                { id: 12, name: "Tonsillitis", path: "~/images/SelfCure/Tonsillitis.png", subitems: null },
                { id: 13, name: "Nose Bleeding", path: "~/images/SelfCure/Nose_Bleeding.png", subitems: null },
                { id: 14, name: "Varicose Veins", path: "~/images/SelfCure/Varicose_Veins.png", subitems: null },
                { id: 15, name: "Migraine", path: "~/images/SelfCure/Migraine.png", subitems: null },
                { id: 16, name: "Vertigo", path: "~/images/SelfCure/Vertigo.png", subitems: null },
                { id: 17, name: "Insomnia", path: "~/images/SelfCure/Insomnia.png", subitems: null },
                { id: 18, name: "Depression", path: "~/images/SelfCure/Depression.png", subitems: null },
                { id: 19, name: "Stress", path: "~/images/SelfCure/Stress.png", subitems: null },
            ]
        },
        {
            id: 2, name: "Seasonal Problems", path: "~/images/pic_seasonalproblems.png", 
            description: "There are certain health problems which are seasonal. In order to fight against such seasonal problems one needs to be careful and follow simple steps to stay healthy and enjoy the season.",
            subitems: 
            [
                { id: 1, name: "Summer", path: "~/images/SeasonalProblems/Summer.png", subitems: null, description:"/html/SeasonalProblems/Summer.html" },
                { id: 2, name: "Monsoon", path: "~/images/SeasonalProblems/Monsoon.png", subitems: null, description:"/html/SeasonalProblems/Monsoon.html" },
                { id: 3, name: "Winter", path: "~/images/SeasonalProblems/Winter.png", subitems: null, description:"/html/SeasonalProblems/Winter.html" },
            ]
        },
        {
            id: 3, name: "First Aid", path: "~/images/pic_firstaid.png", 
            description: "What would you do when there is emergency and medical help is taking too long to come by? Don't worry. This section describes all medical help which you could require in case of emergency.",
            subitems: 
            [
                { id: 1, name: "Animal bites", path: "~/images/FirstAid/Animal_bites.png", subitems: null, description:"/html/FirstAid/Animal_bites.html" },
                { id: 2, name: "Bleeding Gums", path: "~/images/FirstAid/Bleeding_Gums.png", subitems: null, description:"/html/FirstAid/Bleeding_Gums.html" },
                { id: 3, name: "Heat Stroke", path: "~/images/FirstAid/Heat_Stroke.png", subitems: null, description:"/html/FirstAid/Heat_Stroke.html" },
                { id: 4, name: "Toothache", path: "~/images/FirstAid/Toothache.png", subitems: null, description:"/html/FirstAid/Toothache.html" },
            ]
        },
        {
            id: 4, name: "Granny's Tips", path: "~/images/pic_grannystips.png", 
            description: "We all have followed our granny's tips sometimes in our lifetime and might have found it to be better than medicines at times. So here are all those tips which can be easily followed at home without having any side effects.",
            subitems: 
            [
                { id: 1, name: "Dandruff", path: "~/images/GrannyTips/Remedies_for_Dandruff.png", subitems: null, description:"/html/GrannyTips/Remedies_for_Dandruff.html" },
                { id: 2, name: "Healthy and Shiny Hair", path: "~/images/GrannyTips/Tips_for_Healthy_and_Shiny_hair.png", subitems: null, description:"/html/GrannyTips/Tips_for_Healthy_and_Shiny_hair.html"  },
                { id: 3, name: "Grey Hair", path: "~/images/GrannyTips/Remedies_against_Greying_of_Hair.png", subitems: null, description:"/html/GrannyTips/Remedies_against_Greying_of_Hair.html" },
                { id: 4, name: "Hair Loss", path: "~/images/GrannyTips/Remedies_against_Hair_Loss.png", subitems: null, description:"/html/GrannyTips/Remedies_against_Hair_Loss.html" },
                { id: 5, name: "Skin Care", path: "~/images/GrannyTips/Skin_Care.png", subitems: null, description:"/html/GrannyTips/Skin_Care.html" },
                { id: 6, name: "Dark Circles under the Eyes", path: "~/images/GrannyTips/Remedies_for_Dark_Circles_under_the_Eyes.png", subitems: null, description:"/html/GrannyTips/Remedies_for_Dark_Circles_under_the_Eyes.html" },
                { id: 7, name: "Cracked Heels", path: "~/images/GrannyTips/Remedies_for_Cracked_Heels.png", subitems: null, description:"/html/GrannyTips/Remedies_for_Cracked_Heels.html" },
                { id: 8, name: "Common Cold", path: "~/images/GrannyTips/Remedies_against_Hair_Loss.png", subitems: null, description:"/html/GrannyTips/Remedies_against_Hair_Loss.html" },
                { id: 7, name: "Abhyanga - Ayurvedic Massage", path: "~/images/GrannyTips/Abhyanga.png", subitems: null, description:"/html/GrannyTips/Abhyanga.html"  },
                { id: 8, name: "Indian Gooseberry", path: "~/images/GrannyTips/Gooseberry.png", subitems: null, description:"/html/GrannyTips/Gooseberry.html" },
            ]
        },
        {
            id: 5, name: "Contact a Doctor", path: "~/images/pic_appointment.png", 
            description: "In case you cannot find help for your problems from the solution we have provided then you have an option to contact our doctors team. You can describe your problem to us and we will get back to you.",
            subitems: 
            [
                { id: 1, name: "EMail", path: "~/images/ContactDoctor/mail_logo.png", subitems: null },
                { id: 2, name: "Skype", path: "~/images/ContactDoctor/skype_logo.png", subitems: null },
            ]   
        },
        {
            id: 6, name: "Nearest Help", path: "~/images/pic_nearesthelp.png", 
            description: "All the doctors, pharmacies and hospitals are listed below. Get the nearest help you require.",
            subitems:
            [
                { id: 1, name: "Pharmacy", path: "~/images/NearestHelp/pharmacy.png", subitems: null },
                { id: 2, name: "Doctors", path: "~/images/NearestHelp/doctors.png", subitems: null },
                { id: 3, name: "Hospital", path: "~/images/NearestHelp/Hospitals.png", subitems: null },
            ]
        }
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
