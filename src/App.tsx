import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProducerForm from './components/ProducerForm';
import ProducerList from './components/ProducerList';
import ProducerEdit from './components/ProducerEdit';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ProducerList />} />
        <Route path="/add" element={<ProducerForm />} />
        <Route path="/edit/:cpf" element={<ProducerEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
