import React, { useEffect, useState } from 'react';
import styles from './form.module.css';
import ConfirmModal from '../../Shared/ConfirmModal';
import Button from '../../Shared/Button';
import { Input } from '../../Shared/Inputs';

const MemberForm = ({ match }) => {
  const [members, setMembers] = useState([]);
  let [editMember, setEditMember] = useState(null);
  const [modalMessageOpen, setModalMessageOpen] = useState(false);
  let memberId = match.params.id;

  let [member, setMember] = useState({
    name: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    city: '',
    dob: '',
    zip: '',
    isActive: false,
    membership: '',
    password: ''
  });

  const addMember = async (member) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(member)
    });
    if (res.status === 201) {
      const data = await res.json();
      setMembers([...members, data]);
      setModalMessageOpen(false);
    } else {
      setModalMessageOpen(false);
    }
  };

  const updMember = async (id, updatedMember) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedMember)
    });
    if (res.status === 200) {
      setEditMember(null);
      setModalMessageOpen(false);
    } else {
      setModalMessageOpen(false);
    }
  };

  useEffect(() => {
    const getMember = async (id) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/member/${id}`);
        const { data } = await res.json();
        setMember({
          name: data.name,
          lastName: data.lastName,
          dni: data.dni,
          phone: data.phone,
          email: data.email,
          city: data.city,
          dob: data.dob,
          zip: data.zip,
          isActive: false,
          membership: data.membership,
          password: data.password
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (memberId) {
      getMember(memberId);
      editMember = member;
      let newEdit = {
        name: editMember.name,
        lastName: editMember.lastName,
        dni: editMember.dni,
        phone: editMember.phone,
        email: editMember.email,
        city: editMember.city,
        dob: editMember.dob,
        zip: editMember.zip,
        isActive: false,
        membership: editMember.membership,
        password: editMember.password
      };
      setMember(newEdit);
    }
  }, []);

  const onChangeInput = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value,
      isActive: e.target.checked
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (memberId) {
      updMember(memberId, member);
    } else {
      addMember(member);
    }
  };

  return (
    <div className={styles.form_modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          <h2>{memberId ? 'Edit a member' : 'Create a new member'}</h2>
          <span className={styles.close_button}>&times;</span>
        </div>
        <form className={styles.modal_body}>
          <div className={styles.label_container}>
            <Input
              labelText="Name"
              type="text"
              name="name"
              value={member.name}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="LastName"
              type="text"
              name="lastName"
              value={member.lastName}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="DNI"
              type="number"
              name="dni"
              value={member.dni}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Phone"
              type="text"
              name="phone"
              value={member.phone}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Email"
              type="email"
              name="email"
              value={member.email}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="City"
              type="text"
              name="city"
              value={member.city}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Date of birth"
              type="text"
              name="dob"
              value={member.dob}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Zip code"
              type="number"
              name="zip"
              value={member.zip}
              onChange={onChangeInput}
            />
          </div>
          <div className={styles.label_container}>
            <label className={styles.label}>Membership</label>
            <select
              className={styles.input}
              name="membership"
              value={member.membership}
              onChange={onChangeInput}
            >
              <option value="placeholder">Select category</option>
              <option value="classic">Classic</option>
              <option value="only_classes">Only Classes</option>
              <option value="black">Black</option>
            </select>
          </div>
          <div className={styles.label_container}>
            <Input
              labelText="Password"
              type="password"
              name="password"
              value={member.password}
              onChange={onChangeInput}
            />
          </div>
          <div className={`${styles.label_container} ${styles.checkbox}`}>
            <Input
              labelText="Is member active?"
              type="checkbox"
              name="isActive"
              value={member.isActive}
              onChange={onChangeInput}
            />
          </div>
        </form>
        <div className={styles.confirm_button}>
          <Button
            classNameButton="addButton"
            action={() => setModalMessageOpen(true)}
            text={memberId ? 'Update' : 'Submit'}
          />
        </div>
      </div>
      {modalMessageOpen && (
        <ConfirmModal
          title={memberId ? 'Edit member' : 'Add Member'}
          handler={() => setModalMessageOpen(false)}
          onAction={onSubmit}
          reason={'submit'}
        >
          {memberId
            ? `Are you sure you wanna edit ${member.name}?`
            : `Are you sure you wanna add ${member.name} to the members list?`}
        </ConfirmModal>
      )}
    </div>
  );
};

export default MemberForm;
