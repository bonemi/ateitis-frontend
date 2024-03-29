import validator from "validator";
import { isEmpty } from "lodash";

// @TODO to be revisited for updating for other countries.
const postCodeLocale = "AR";

const validateAndSanitizeCheckoutForm = data => {
  let errors = {};
  let sanitizedData = {};

  /**
   * Set the firstName value equal to an empty string if user has not entered the firstName, otherwise the Validator.isEmpty() wont work down below.
   * Note that the isEmpty() here is our custom function defined in is-empty.js and
   * Validator.isEmpty() down below comes from validator library.
   * Similarly we do it for for the rest of the fields
   */
  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.country = !isEmpty(data.country) ? data.country : "";
  data.address1 = !isEmpty(data.address1) ? data.address1 : "";
  data.address2 = !isEmpty(data.address2) ? data.address2 : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.postcode = !isEmpty(data.postcode) ? data.postcode : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.customerNote = !isEmpty(data.customerNote) ? data.customerNote : "";
  data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : "";

  /**
   * Checks for error if required is true
   * and adds Error and Sanitized data to the errors and sanitizedData object
   *
   * @param {String} fieldName Field name e.g. First name, last name
   * @param {String} errorContent Error Content to be used in showing error e.g. First Name, Last Name
   * @param {Integer} min Minimum characters required
   * @param {Integer} max Maximum characters required
   * @param {String} type Type e.g. email, phone etc.
   * @param {boolean} required Required if required is passed as false, it will not validate error and just do sanitization.
   */
  const addErrorAndSanitizedData = (
    fieldName,
    errorContent,
    min,
    max,
    type = "",
    required
  ) => {
    const postCodeLocaleVal = postCodeLocale ? postCodeLocale : "";
    /**
     * Please note that this isEmpty() belongs to validator and not our custom function defined above.
     *
     * Check for error and if there is no error then sanitize data.
     */
    if (!validator.isLength(data[fieldName], { min, max })) {
      errors[
        fieldName
      ] = `${errorContent} debe ser entre ${min} y ${max} caracteres`;
    }

    if ("email" === type && !validator.isEmail(data[fieldName])) {
      errors[fieldName] = `${errorContent} no es un e-mail válido`;
    }

    if ("phone" === type && !validator.isMobilePhone(data[fieldName])) {
      errors[fieldName] = `${errorContent} no es un número válido`;
    }

    /*if ( 'postcode' === type && postCodeLocaleVal && ! validator.isPostalCode( data[ fieldName ], postCodeLocaleVal ) ) {
			errors[ fieldName ] = `${errorContent} is not valid`;
		}*/

    if (required && validator.isEmpty(data[fieldName])) {
      errors[fieldName] = `${errorContent} es requerido.`;
    }

    // If no errors
    if (!errors[fieldName]) {
      sanitizedData[fieldName] = validator.trim(data[fieldName]);
      sanitizedData[fieldName] =
        "email" === type
          ? validator.normalizeEmail(sanitizedData[fieldName])
          : sanitizedData[fieldName];
      sanitizedData[fieldName] = validator.escape(sanitizedData[fieldName]);
    }
  };

  addErrorAndSanitizedData("firstName", "Nombre", 2, 35, "string", true);
  addErrorAndSanitizedData("lastName", "Apellido", 2, 35, "string", true);
  addErrorAndSanitizedData("company", "Empresa", 2, 35, "string", false);
  addErrorAndSanitizedData("country", "País", 2, 55, "string", true);
  addErrorAndSanitizedData("address1", "Dirección", 5, 100, "string", true);
  addErrorAndSanitizedData("address2", "", 0, 254, "string", false);
  addErrorAndSanitizedData("city", "Ciudad", 3, 25, "string", true);
  addErrorAndSanitizedData("state", "Provincia", 0, 254, "string", true);
  addErrorAndSanitizedData("postcode", "Código postal", 2, 10, "postcode", true);
  addErrorAndSanitizedData("phone", "Número de teléfono", 10, 15, "phone", true);
  addErrorAndSanitizedData("email", "Email", 11, 254, "email", true);

  // The data.createAccount is a boolean value.
  sanitizedData.createAccount = data.createAccount;

  // If create accoun is true.
  if (data.createAccount) {
    addErrorAndSanitizedData("username", "Username", 2, 35, "string", true);
    addErrorAndSanitizedData("password", "Password", 2, 35, "string", true);
  }

  addErrorAndSanitizedData("customerNote", "", 0, 254, "string", false);
  addErrorAndSanitizedData(
    "paymentMethod",
    "Payment mode field",
    2,
    50,
    "string",
    true
  );

  return {
    sanitizedData,
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAndSanitizeCheckoutForm;
