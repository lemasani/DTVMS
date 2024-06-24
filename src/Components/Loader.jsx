// src/Components/Loader.jsx
import PropTypes from 'prop-types';
import 'ldrs/tailChase';

export default function Loader({
    size = '58',
    speed = '1.75',
    color = 'blue',
    message = 'Loading...',
    }) {
    return (
        <>
        <l-tail-chase size={size} speed={speed} color={color}></l-tail-chase>
        <div style={{ textAlign: 'center', marginTop: '10px', color: color }}>
            {message}
        </div>
        </>
    );
}

    Loader.propTypes = {
    size: PropTypes.string,
    speed: PropTypes.string,
    color: PropTypes.string,
    message: PropTypes.string,
    };
