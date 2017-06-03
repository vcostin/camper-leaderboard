import React from 'react';
import PropTypes from 'prop-types';

const CamperRow = ({
  count,
  camperImg,
  camperUsername,
  camperRecent,
  camperAlltime,
}) => (
    <tr>
      <td>{count}</td>
      <td>
        <div className="table-cell-container">
          <div className="avatar">
            <img src={camperImg} alt={camperUsername} className="img-thumbnail" />
          </div>
          <div className="user-name">
            <a
              href={`https://www.freecodecamp.com/${camperUsername}`}
              target="_blank"
              rel="noopener noreferrer"
            >{camperUsername}</a>
          </div>
        </div>
      </td>
      <td>
        <div className="table-cell-container centrate">
          <div className="inner-cell">{camperRecent}</div>
        </div>
      </td>
      <td>
        <div className="table-cell-container centrate">
          <div className="inner-cell">{camperAlltime}</div>
        </div>
      </td>
    </tr>
  );

CamperRow.propTypes = {
  count: PropTypes.number.isRequired,
  camperImg: PropTypes.string.isRequired,
  camperUsername: PropTypes.string.isRequired,
  camperRecent: PropTypes.number.isRequired,
  camperAlltime: PropTypes.number.isRequired,
};

export default CamperRow;
