import React from "react";
import { useDispatch } from "react-redux";
import { authenticatingUser } from "../../redux/actions";
import { Link } from "react-router-dom";
import { Segment, Button, Divider, Grid } from "semantic-ui-react";
import { useForm } from "react-hook-form";

interface FormInput {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const dispatch = useDispatch();
  const onSubmit = (formFields: FormInput) => dispatch(authenticatingUser({ user: formFields }));

  return (
    <div className="wrapper backImage">
      <Grid centered textAlign="left">
        <Grid.Row>
          <h1>Log In</h1>
        </Grid.Row>
        <Grid.Row>
          <Segment id="login">
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="required field">
                    <label htmlFor="username">Username: </label>
                    <input {...register("username", { required: true })} type="text" name="username" id="username" />
                    {errors.username && <p role="alert">Username is required</p>}
                  </div>

                  <div className="required field">
                    <label htmlFor="password">Password: </label>
                    <input
                      {...register("password", { required: true })}
                      type="password"
                      name="password"
                      id="password"
                    />
                    {errors.password && <p role="alert">Password is required</p>}

                    <br />
                  </div>
                  <button className="ui button primary" type="submit">
                    Login
                  </button>
                </form>
              </Grid.Column>
              <Grid.Column textAlign="center" verticalAlign="middle">
                <Button content="Sign Up" as={Link} to="/signup" icon="signup" size="big" />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Login;
