
const FloatingButton = () => {

  const handleKonsultasi = () => {
    window.open('https://sumateravetcare.crativa.id/', '_blank')
  }
  return (
    <button className="floating-button" onClick={handleKonsultasi}>
      Konsultasi 
    </button>
  );
};

export default FloatingButton;