import './scss/App.scss';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import About from './layout/About';
import Tours from './layout/Tours';
import Contact from './layout/Contact';
import Footer from './layout/Footer';

function App () {
	return (
		<div className="App">
			<Header />
			<Navbar />
			<div className="content">
				<About />
				<Tours />
				<Contact />
			</div>
			<Footer />
		</div>
	);
}

export default App;
