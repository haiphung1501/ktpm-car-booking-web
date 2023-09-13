const Marker = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '18px',
        height: '18px',
        backgroundColor: '#000',
        border: '2px solid #fff',
        borderRadius: '100%',
        userSelect: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    ></div>
  );
};

export default Marker;
