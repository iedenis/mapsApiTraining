import mongoose from 'mongoose';
const SupermarketSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        type: String,
        required: true
    },

    coordinates:
    {
        latitude: Number,
        longitude: Number
    }
},
    { collection: 'supermarkets' });

let SupermarketModel = mongoose.model('Supermarkets', SupermarketSchema);


SupermarketModel.getSupermarketsByDistance = async (lat, lon, radius) => {
    let supermarkets = await SupermarketModel.find({});
    var superM = {
        name: String,
        distance: Number
    }
    let supers = [superM];
    for (let i = 0; i < supermarkets.length; i++) {
        let dist = calcDistance(supermarkets[i].coordinates.latitude, supermarkets[i].coordinates.longitude, lat, lon);

        if (dist < 50) {
            supers[i] = {
                name: supermarkets[i].name,
                distance: Math.round(dist*100)/100
            }

        }
    }

    return supers.sort(SupermarketModel.compare);

}

SupermarketModel.compare = (a, b) => {
    return a.distance - b.distance;
}
SupermarketModel.addCar = (carToAdd) => {
    return carToAdd.save();
}

SupermarketModel.removeCar = (carName) => {
    return SupermarketModel.remove({ name: carName });
}
function calcDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

// Converts numeric degrees to radians
function deg2rad(Value) {
    return Value * Math.PI / 180;
}

export default SupermarketModel;