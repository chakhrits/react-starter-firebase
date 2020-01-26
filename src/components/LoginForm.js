import React from 'react'

import firebase from '../firebase'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      currentUser: null,
      errorMessage: ''
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ currentUser: user })
      }
    })
  }

  onInputChange = e => {
    const { name, value } = e.target

    this.setState({
      [name]: value
    })
  }

  onHandleSubmit = e => {
    e.preventDefault()

    const { email, password } = this.state

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.setState({
          currentUser: res.user
        })
      })
      .catch(err => {
        this.setState({
          errorMessage: err.message
        })
      })
  }

  logout = e => {
    e.preventDefault()

    firebase
      .auth()
      .signOut()
      .then(res => {
        this.setState({
          currentUser: null,
          errorMessage: ''
        })
      })
  }

  onCancel = () => {
    this.formRef.reset()
  }

  render() {
    const { errorMessage, currentUser } = this.state

    if (currentUser) {
      return (
        <div>
          <p>Hello {currentUser.email}</p>
          <button onClick={this.logout}>Logout</button>
        </div>
      )
    }
    return (
      <section className="section container">
        <div className="columns is-centered">
          <div className="column is-half">
            <form
              onSubmit={this.onHandleSubmit}
              ref={element => (this.formRef = element)}
            >
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    name="email"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    onChange={this.onInputChange}
                  />
                </div>
              </div>

              {errorMessage ? (
                <p className="help is-danger">{errorMessage}</p>
              ) : null}

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-text" onClick={this.onCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default LoginForm
