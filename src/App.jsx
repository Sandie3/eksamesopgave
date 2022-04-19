import './scss/App.scss';
import Header from './layout/Header';
import Navbar from './layout/Navbar';
import About from './layout/About';
import Tours from './layout/Tours';
import Contact from './layout/Contact';

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
		</div>
	);
}

export default App;
