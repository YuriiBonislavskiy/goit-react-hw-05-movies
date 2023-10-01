import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { ReactComponent as IconSearch } from '../../Icons/Search.svg';
import { nanoid } from 'nanoid';
import css from './Searchbar.module.css';

export const Searchbar = ({ query, onHandleSubmit }) => {
  const initialValues = {
    searchText: query,
  };

  // const searchText = initialValues.query;
  // console.log(searchText);
  const schema = yup.object().shape({
    searchText: yup.string().required('Required').trim(),
  });

  const handleSubmit = ({searchText}) => {
    onHandleSubmit(searchText.trim());
  };

  const formId = nanoid();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <div className={css.Searchbar}>
        <Form className={css.SearchForm} autoComplete="off">
          <Field
            id={formId}
            className={css.SearchFormInput}
            type="text"
            name="searchText"
            autoComplete="off"
            autoFocus
            placeholder="Search movie by name"
          />
          <button type="submit" className={css.SearchFormButton}>
            <IconSearch className={css.SearchFormButtonIcon} />
          </button>
        </Form>
      </div>
    </Formik>
  );
};

Searchbar.protoType = {
  query: PropTypes.string.isRequired,
  onHandleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
