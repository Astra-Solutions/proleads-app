import moment from "moment";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    createAccount,
    updateAccount
} from "../../../../store/users/users.actions";
import { Button, ButtonTypes } from "../../../Button/Button";
import { Checkbox } from "../../../Checkbox/Checkbox";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Form } from "../../../Form/Form";
import { Input } from "../../../Input/Input";
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import ToggleButton from '@material-ui/lab/ToggleButton';
import CTBFields from "../../../../assets/CTBFields.svg"

import "./UserAdminModal.scss";

function UserAdminModal({ user, isAdd }: any) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector((state: any) => state.users);

    const INITIAL_User = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "",
        isDeleted: ""
    };

    const password ={
        password:"",
    }

    const [newUser, setNewUser] = useState<any>(INITIAL_User);
    const [newUserErrors, setNewUserErrors] = useState<any>({});
    const [isDeleted, setIsDeleted] = useState<any>(false)
    const [userRole, setUserRole] = useState<any>("");
    const [currentPassword, setCurrentPassword] = useState<any>(password)
    const [selected,setSelected] = useState<any>("")


    const validations: any = {
        username: {
            isRequired: true,
        },
        first_name: {
            isRequired: true,
        },
        last_name: {
            isRequired: true,
        },

    };

    const changeEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewUser({
            ...newUser,
            [name]: value,
        });
        if (errors.length > 0)
            setNewUserErrors({
                ...newUserErrors,
                [name]: errors,
            });
        else
            setNewUserErrors({
                ...newUserErrors,
                [name]: [],
            });
    };

    const blurEvent = (e: any): void => {
        const name = e.target.name;
        const value = e.target.value;

        const validator = validations[name];
        const errors = [];

        if (validator) {
            if (validator.isRequired) {
                if (validator.isBoolean) {
                    if (value !== true || value !== false) {
                        errors.push("REQUIRED_FIELD");
                    }
                } else {
                    if (value.length < 1) {
                        errors.push("REQUIRED_FIELD");
                    }
                }
            }
        }

        setNewUser({
            ...newUser,
            [name]: value ? value.trim() : "",
        });

        if (errors.length > 0)
            setNewUserErrors({
                ...newUserErrors,
                [name]: errors,
            });
        else
            setNewUserErrors({
                ...newUserErrors,
                [name]: [],
            });
    };

    const hasSomeErrors = (): boolean => {
        const hasErrors = Object.keys(newUserErrors).some(
            (value: any) => newUserErrors[value].length > 0
        );

        return hasErrors;
    };

    useEffect(() => {
        if (user) {
            setCurrentPassword({
                password: user.password,
            })
            setNewUser({
                username: user.username,
                first_name: user.first_name,
                last_name: user.last_name,
                role: user.role,
                isDeleted: user.isDeleted
            });
            setNewUserErrors({});
        }
    }, [user]);


    useEffect(() => {
        if (users.update.errors) {
            setNewUserErrors(users.update.errors);
        }
    }, [users.update]);

    useEffect(() => {
        if (users.add.errors) {
            setNewUserErrors(users.add.errors);
        }
    }, [users.add]);

    const handleRole = (e: any): void => {
        const value = e.target.value;
        if(value === "admin") setSelected(true)
        else setSelected(false)
        setUserRole(value);
    };

    const createUser = (): void => {
        dispatch(
            createAccount(newUser.username, newUser.password, newUser.first_name, newUser.last_name, userRole, isDeleted, navigate)
        );
    };

    const updateUser=(): void => {
        dispatch(updateAccount({...newUser,role:userRole},user.id,navigate))
    }

    return (
        <div id="User-admin-modal">
            <div className="tab">
                <img src={CTBFields}
                    className="add-image"
                    alt="" />
                <h2>Add User</h2>
            </div>
            <div className="forma">
                <Form className="form">
                    <div className="inp">
                        <h2 className="adm">Username</h2>
                        <Input
                            id={"username"}
                            type={"text"}
                            name={"username"}
                            value={newUser["username"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["username"]}
                            placeholder={"username"}
                        />
                        <h2 className="adm">Firstname</h2>
                        <Input
                            id={"first_name"}
                            type={"text"}
                            name={"first_name"}
                            value={newUser["first_name"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["first_name"]}
                            placeholder={"Firstname"}
                        />
                        <h2 className="adm">Lastname</h2>
                        <Input
                            id={"last_name"}
                            type={"text"}
                            name={"last_name"}
                            value={newUser["last_name"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["last_name"]}
                            placeholder={"Lastname"}
                        />

                    </div>
                    <div className="inp">
                        <h2 className="adm">Password</h2>
                        <Input
                            id={"password"}
                            type={"password"}
                            name={"password"}
                            value={newUser["password"]}
                            onChange={(e: any): void => changeEvent(e)}
                            onBlur={(e: any): void => blurEvent(e)}
                            errors={newUserErrors["password"]}
                            placeholder={"Password"}
                        />
                        <h2 className="adm">Admin?</h2>
                        <div className="toggle">
                            <ToggleButtonGroup
                                id="role"
                                onChange={(e): void => handleRole(e)}
                                onBlur={(e: any): void => handleRole(e)}
                                value={userRole}
                                aria-label="Is Admin?"
                                color="success"
                                exclusive={true}
                                
                            >

                                <ToggleButton className="tglbtn" value={"agent"} aria-label="false" >FALSE</ToggleButton>
                                <ToggleButton className="tglbtn" value={"admin"} aria-label="true" >TRUE</ToggleButton>
                            </ToggleButtonGroup>
                            <h3 className="desc">By making an user admin he will get the full access to the app.</h3>
                        </div>
                        <br/>
                        {!isAdd && (
                            <Checkbox
                                checkItem={() =>
                                    setNewUser({
                                        ...newUser,
                                        isDeleted: !newUser.isDeleted
                                    })
                                }
                                isChecked={newUser.isDeleted}
                                disabled={false}
                                label="Do you want to soft delete this user?"
                            />
                        )}
                    </div>
                </Form>
            </div>
            <div className="butt">
                {!isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => updateUser()}
                        loading={users.update.loading}
                        disabled={users.update.loading || hasSomeErrors()}
                    >
                        Save
                    </Button>
                )}
                {isAdd && (
                    <Button
                        btnClass={ButtonTypes.primary}
                        onClick={() => createUser()}
                        loading={users.add.loading}
                        disabled={users.add.loading || hasSomeErrors()}
                    >
                        Create
                    </Button>
                )}
            </div>
        </div>

    );
}

export default UserAdminModal;
