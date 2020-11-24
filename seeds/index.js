const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// CONNECT DB
mongoose.connect('mongodb://localhost:27017/campgrounds', {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database Connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const camp = new Campground({
			author: '5fb9ed926e5a42338e6d27a7',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			price: price,
			images: [
				{
					url:
						'https://res.cloudinary.com/dnvxsefyc/image/upload/v1606116729/Campgrounds/yxz6res6mw9aks9znqu5.jpg',
					filename: 'Campgrounds/yxz6res6mw9aks9znqu5'
				},
				{
					url:
						'https://res.cloudinary.com/dnvxsefyc/image/upload/v1606116731/Campgrounds/vmisuqahrjxl2sdqhj4k.jpg',
					filename: 'Campgrounds/vmisuqahrjxl2sdqhj4k'
				}
			]
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
