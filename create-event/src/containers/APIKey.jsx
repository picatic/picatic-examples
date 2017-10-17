import React from 'react'

const APIKey = ({ apiKey, handleChange, login }) =>
  <div className="container mt-4">
    <div className="row">
      <div className="col">
        <input
          type="text"
          value={apiKey}
          className="form-control"
          placeholder="Picatic API Key"
          onChange={handleChange('apiKey')}
        />
      </div>
      <div className="col">
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary"
          onClick={login}
        >
          Submit
        </button>
      </div>
    </div>
    <p>sk_live_4481fd77f109eb6622beec721b9d1f5a</p>
  </div>

export default APIKey
