import React, { Component } from 'react';

import avatarImg from '../../assets/avatar.jpg';
import styles from './Buttons.module.css';
import Button from './Button';

class ProfileButton extends Component {
	state = {
		showMenu: false,
	};

	closeMenu = () =>
		this.setState({ showMenu: false }, () => {
			document.removeEventListener('click', this.closeMenu);
		});

	toggleMenu = () =>
		this.setState({ showMenu: !this.state.showMenu }, () => {
			document.addEventListener('click', this.closeMenu);
		});

	render() {
		return (
			<div>
				<button className={styles.ProfileButton} onClick={this.toggleMenu}>
					<img src={avatarImg} alt="Avatar" />
				</button>
				{this.state.showMenu ? (
					<div className={styles.ProfileButton__menu}>
						<Button to={`/user/${this.props.userId}`} text="Profile" large />
						<Button to="/" text="Logout" large onClick={this.props.logout} />
					</div>
				) : null}
			</div>
		);
	}
}

export default ProfileButton;
