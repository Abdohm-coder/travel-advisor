import ReactLoading from 'react-loading';
 
const LoadingCircle = ({ type, color }) => (
    <div style={{ display: "grid", placeItems: "center", flex: 1, width: "100%", height: "100%"}}>
        <ReactLoading type={type} color={color} height={50} width={50} />
    </div>
);


export default LoadingCircle