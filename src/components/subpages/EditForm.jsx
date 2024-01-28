import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

import useEditFormLogic from '../../hooks/useEditFormLogic';

import Layout from '../shared/Layout';
import { PokemonCard } from '../shared/PokemonCard';
import { Container } from '../shared/Container';
import { InputField } from '../shared/InputField';
import { FormWrap, Row, Span, FormButton } from '../shared/forFormComponents';

const EditForm = () => {
  const { id } = useParams();
  const idElement = parseInt(id);

  const { pokemon, handleSubmit } = useEditFormLogic(idElement);

  const validationSchema = Yup.object({
    height: Yup.number().required('Pole "Height" jest wymagane.'),
    weight: Yup.number().required('Pole "Weight" jest wymagane.'),
    base_experience: Yup.number().required(
      'Pole "Base_experience" jest wymagane.',
    ),
  });

  return (
    <Layout>
      <Container $column>
        <PokemonCard
          $reduce
          to="forHome"
          isFavourite={pokemon.isFavourite}
          isFighting={pokemon.isFighting}
          src={pokemon.sprites.other.home.front_default}
          name={pokemon.name}
          height={pokemon.height}
          weight={pokemon.weight}
          ability={pokemon.abilities[0].ability.name}
          baseExperience={pokemon.base_experience}
        />
        <h1>Complete the data to edit Pokemon:</h1>
        <Formik
          initialValues={{
            height: pokemon.height,
            weight: pokemon.weight,
            base_experience: pokemon.base_experience,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <FormWrap>
            <Form>
              <Row>
                <InputField
                  as={Field}
                  htmlFor="height"
                  label="Height"
                  id="height"
                  type="number"
                  name="height"
                  placeholder={pokemon.height}
                >
                  <ErrorMessage name="height" component={Span} />
                </InputField>
                <InputField
                  as={Field}
                  htmlFor="weight"
                  label="Weight"
                  id="weight"
                  type="number"
                  name="weight"
                  placeholder={pokemon.weight}
                >
                  <ErrorMessage name="weight" component={Span} />
                </InputField>
                <InputField
                  as={Field}
                  htmlFor="base_experience"
                  label="Base experience"
                  id="base_experience"
                  type="number"
                  name="base_experience"
                  placeholder={pokemon.base_experience}
                >
                  <ErrorMessage name="base_experience" component={Span} />
                </InputField>
                <FormButton type="submit">Edit Pokemon</FormButton>
              </Row>
            </Form>
          </FormWrap>
        </Formik>
      </Container>
    </Layout>
  );
};

export default EditForm;
