import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import moment from 'moment';

import styles from './Comment.module.css';
import avatarImg from '../../assets/avatar.jpg';
import Button from '../Buttons/Button';
import CommentForm from './CommentForm';

export default class Comment extends Component {
	static propTypes = {
		comment: PropTypes.shape({
			posterId: PropTypes.number.isRequired,
			posterFirstName: PropTypes.string.isRequired,
			posterLastName: PropTypes.string.isRequired,
			datetime: PropTypes.string.isRequired,
			body: PropTypes.string.isRequired,
		}).isRequired,
		storyId: PropTypes.number.isRequired,
		currentUser: PropTypes.shape({}).isRequired,
	};

	state = {
		editMode: false,
	};

	toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

	render() {
		const btnStyles = {
			position: 'absolute',
			top: '1rem',
			right: '1rem',
		};
		const { comment, storyId, currentUser } = this.props;
		return (
			<article className={styles.Comment}>
				{currentUser.id === comment.posterId ? (
					<Button
						customStyles={btnStyles}
						onClick={this.toggleEditMode}
						small
						text={this.state.editMode ? 'Cancel' : 'Edit'}
						to="#"
					/>
				) : null}

				{!this.state.editMode ? (
					<Fragment>
						<Link to={`/user/${comment.posterId}`}>
							<img src={avatarImg} alt="Comment poster avatar" />
						</Link>
						<div className={styles.Comment__content}>
							<span className={styles.Comment__author}>
								{comment.posterFirstName} {comment.posterLastName}
							</span>
							<span className={styles.Comment__date}> {moment(comment.datetime).fromNow()}</span>
							<p className={styles.Comment__body}>{comment.body}</p>
						</div>
					</Fragment>
				) : (
					<CommentForm
						comment={comment}
						currentUser={currentUser}
						editMode
						storyId={storyId}
						toggleEditMode={this.toggleEditMode}
					/>
				)}
			</article>
		);
	}
}
