<template>
  <div class="pizza__form-box">
    <Form
      @submit="handleFormSubmit"
      class="pizza-form"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
    >
      <div class="pizza-form__row">
        <div class="pizza-form__control">
          <label for="name" class="pizza-form__label">Name</label>
          <Field
            type="text"
            class="pizza-form__input"
            id="name"
            name="name"
            placeholder="Add pizza name..."
          />
          <ErrorMessage name="name" class="pizza-form__error-message" />
        </div>
        <div class="pizza-form__control">
          <label for="spiceLevel" class="pizza-form__label">Spice Level</label>
          <Field
            as="select"
            class="pizza-form__input"
            id="spiceLevel"
            name="spiceLevel"
            placeholder="Add pizza spice level..."
          >
            <option value="">Select Spice Level</option>
            <option value="NOT_SPICY">Not Spicy</option>
            <option value="MILD">MILD</option>
            <option value="HOT">HOT</option>
          </Field>
          <ErrorMessage name="spiceLevel" class="pizza-form__error-message" />
        </div>
      </div>
      <div class="pizza-form__row">
        <div class="pizza-form__control">
          <label for="categoryId" class="pizza-form__label"
            >Pizza Category</label
          >
          <Field
            as="select"
            type="categoryId"
            class="pizza-form__input"
            id="categoryId"
            name="categoryId"
          >
            <option value="">Select Pizza Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </Field>
          <ErrorMessage name="categoryId" class="pizza-form__error-message" />
        </div>
        <div class="pizza-form__control">
          <div class="pizza-form__radio-box">
            <p class="pizza-form__radio-title">
              Choose Either Vegan or Non-Vegan
            </p>
            <div class="pizza-form__radio-text-box">
              <label for="vegan" class="pizza-form__radio-label"
                >Vegan
                <Field
                  type="radio"
                  class="pizza-form__radio-input"
                  id="vegan"
                  name="vegan"
                  :value="true"
                />
              </label>
              <label for="non-vegan" class="pizza-form__radio-label"
                >Non-Vegan
                <Field
                  type="radio"
                  class="pizza-form__radio-input"
                  id="non-vegan"
                  name="vegan"
                  :value="false"
                />
              </label>
            </div>
            <ErrorMessage name="vegan" class="pizza-form__error-message" />
          </div>
        </div>
      </div>
      <div class="pizza-form__control">
        <p class="pizza-form__emergency-title">Select Pizza Sizes</p>
        <FieldArray name="pizzaSizes" v-slot="{ fields }">
          <div
            v-for="(pizza, idx) in fields"
            :key="pizza.key"
            class="pizza-form__emergency-box"
          >
            <fieldset>
              <figcaption class="pizza-form__emergency-caption">
                Pizza Size {{ idx + 1 }}
              </figcaption>
              <div class="pizza-form__file-box">
                <img
                  v-if="initialValues.pizzaSizes[idx].photo"
                  :src="initialValues.pizzaSizes[idx].photo"
                  class="pizza-form__img"
                  :alt="initialValues.name"
                />
                <label :for="`photo_${idx}`" class="pizza-form__label"
                  >Upload Pizza Photo</label
                >
                <Field
                  type="file"
                  class="pizza-form__input pizza-form__file-input"
                  :id="`photo_${idx}`"
                  :name="`pizzaSizes[${idx}].photo`"
                  placeholder="Add pizza photo..."
                />
                <ErrorMessage
                  :name="`pizzaSizes[${idx}].photo`"
                  class="pizza-form__error-message"
                />
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label :for="`size_${idx}`" class="pizza-form__label"
                    >Pizza Size</label
                  >
                  <Field
                    as="select"
                    class="pizza-form__input"
                    :id="`size_${idx}`"
                    :name="`pizzaSizes[${idx}].size`"
                  >
                    <option value="">Select Pizza Size</option>
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </Field>
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].size`"
                  />
                </div>

                <div class="pizza-form__control">
                  <div class="pizza-form__control">
                    <label
                      :for="`circumfarance_${idx}`"
                      class="pizza-form__label"
                      >Price</label
                    >
                    <Field
                      type="number"
                      class="pizza-form__input"
                      :id="`circumfarance_${idx}`"
                      :name="`pizzaSizes[${idx}].price`"
                      placeholder="Enter Pizza Price..."
                      @keydown="handlePreventFormSubmission('number', $event)"
                    />
                    <ErrorMessage
                      class="pizza-form__error-message"
                      :name="`pizzaSizes[${idx}].price`"
                    />
                  </div>
                </div>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label :for="`circumfarance_${idx}`" class="pizza-form__label"
                    >Cirfumfarance</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`circumfarance_${idx}`"
                    :name="`pizzaSizes[${idx}].circumfarance`"
                    placeholder="Enter Pizza Cirfumfarance..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].circumfarance`"
                  />
                </div>
                <div class="pizza-form__control">
                  <div class="pizza-form__control">
                    <label :for="`weight_${idx}`" class="pizza-form__label"
                      >Weight</label
                    >
                    <Field
                      type="number"
                      class="pizza-form__input"
                      :id="`weight_${idx}`"
                      :name="`pizzaSizes[${idx}].weight`"
                      placeholder="Enter Pizza Weight..."
                      @keydown="handlePreventFormSubmission('number', $event)"
                    />
                    <ErrorMessage
                      class="pizza-form__error-message"
                      :name="`pizzaSizes[${idx}].weight`"
                    />
                  </div>
                </div>
              </div>
              <div class="pizza-form__title-box">
                <h3 class="pizza-form__title">Pizza Cuts</h3>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`slices.regularCut_${idx}`"
                    class="pizza-form__label"
                    >Regular Cut</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`slices.regularCut_${idx}`"
                    :name="`pizzaSizes[${idx}].slices.regularCut`"
                    placeholder="Enter Regular Cut Amount..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].slices.regularCut`"
                  />
                </div>

                <div class="pizza-form__control">
                  <label
                    :for="`slices.doubleCut_${idx}`"
                    class="pizza-form__label"
                    >Double Cut</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`slices.doubleCut_${idx}`"
                    :name="`pizzaSizes[${idx}].slices.doubleCut`"
                    placeholder="Enter Double Cut Amount..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].slices.doubleCut`"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :for="`slices.squareCut_${idx}`"
                    class="pizza-form__label"
                    >Square Cut</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`slices.squareCut_${idx}`"
                    :name="`pizzaSizes[${idx}].slices.squareCut`"
                    placeholder="Enter Square Cut Amount..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].slices.squareCut`"
                  />
                </div>
              </div>
              <div class="pizza-form__title-box">
                <h3 class="pizza-form__title">Pizza Crusts</h3>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`crusts.classicCrust_${idx}`"
                    class="pizza-form__label"
                    >Classic Crust</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`crusts.classicCrust_${idx}`"
                    :name="`pizzaSizes[${idx}].crusts.classicCrust`"
                    placeholder="Enter Classic Crust Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].crusts.classicCrust`"
                  />
                </div>

                <div class="pizza-form__control">
                  <label
                    :for="`crusts.thinCrust_${idx}`"
                    class="pizza-form__label"
                    >Thin Crust</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`crusts.thinCrust_${idx}`"
                    :name="`pizzaSizes[${idx}].crusts.thinCrust`"
                    placeholder="Enter Thin Crust Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].crusts.thinCrust`"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :for="`crusts.thinnestCrust_${idx}`"
                    class="pizza-form__label"
                    >Thinnest Crust</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`crusts.thinnestCrust_${idx}`"
                    :name="`pizzaSizes[${idx}].crusts.thinnestCrust`"
                    placeholder="Enter Thinnest Crust Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].crusts.thinnestCrust`"
                  />
                </div>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`crusts.duplexCrustMozarella_${idx}`"
                    class="pizza-form__label"
                    >Duplex Crust Mozarella</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`crusts.duplexCrustMozarella_${idx}`"
                    :name="`pizzaSizes[${idx}].crusts.duplexCrustMozarella`"
                    placeholder="Enter Slice Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].crusts.duplexCrustMozarella`"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :for="`crusts.duplexCrustCheddar_${idx}`"
                    class="pizza-form__label"
                    >Duplex Crust Cheddar</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`crusts.duplexCrustCheddar_${idx}`"
                    :name="`pizzaSizes[${idx}].crusts.duplexCrustCheddar`"
                    placeholder="Enter Slice Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].crusts.duplexCrustCheddar`"
                  />
                </div>
              </div>

              <div class="pizza-form__title-box">
                <h3 class="pizza-form__title">Pizza Edges</h3>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`edges.mozarellaEdge_${idx}`"
                    class="pizza-form__label"
                    >Mozarella Edge</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`edges.mozarellaEdge_${idx}`"
                    :name="`pizzaSizes[${idx}].edges.mozarellaEdge`"
                    placeholder="Enter Pizza Edge Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].edges.mozarellaEdge`"
                  />
                </div>

                <div class="pizza-form__control">
                  <label
                    :for="`edges.saucageEdge_${idx}`"
                    class="pizza-form__label"
                    >Saucage Edge</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`edges.saucageEdge_${idx}`"
                    :name="`pizzaSizes[${idx}].edges.saucageEdge`"
                    placeholder="Enter Pizza Edge Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].edges.saucageEdge`"
                  />
                </div>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`edges.parmesanEdge_${idx}`"
                    class="pizza-form__label"
                    >Parmesan Edge</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`edges.parmesanEdge_${idx}`"
                    :name="`pizzaSizes[${idx}].edges.parmesanEdge`"
                    placeholder="Enter Pizza Edge Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].edges.parmesanEdge`"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :for="`edges.garlicSaucageEdge_${idx}`"
                    class="pizza-form__label"
                    >Garlic Saucage Edge</label
                  >
                  <Field
                    type="number"
                    class="pizza-form__input"
                    :id="`edges.garlicSaucageEdge_${idx}`"
                    :name="`pizzaSizes[${idx}].edges.garlicSaucageEdge`"
                    placeholder="Enter Pizza Edge Price..."
                    @keydown="handlePreventFormSubmission('number', $event)"
                  />
                  <ErrorMessage
                    class="pizza-form__error-message"
                    :name="`pizzaSizes[${idx}].edges.garlicSaucageEdge`"
                  />
                </div>
              </div>

              <div class="pizza-form__title-box">
                <h3 class="pizza-form__title">Pizza Standard Toppings</h3>
              </div>

              <div v-if="pizza.value.size" class="pizza-form__checkbox-row">
                <div
                  v-for="topping in toppings.filter(
                    (t) =>
                      t.type === 'STANDARD' &&
                      t.forPizzaSize === pizza.value.size
                  )"
                  :key="topping.id"
                  class="pizza-form__checkbox-box"
                >
                  <label
                    :for="`id_${topping.type}-${topping.id}`"
                    class="pizza-form__label .pizza-form__checkbox-label"
                    >{{ topping.name }}</label
                  >
                  <AddPizzaCheckbox
                    :id="`id_${topping.type}-${topping.id}`"
                    :name="`pizzaSizes[${idx}].standardToppings`"
                    :isCreatingPizza="isCreatingPizza"
                    :value="
                      !isCreatingPizza &&
                      initialValues.pizzaSizes
                        .filter((p) => p.size === pizza?.value?.size)[0]
                        .standardToppings.some(
                          (standardTopping) =>
                            standardTopping.type === 'STANDARD' &&
                            standardTopping.name === topping.name
                        )
                        ? initialValues.pizzaSizes
                            .filter((p) => p.size === pizza?.value?.size)[0]
                            .standardToppings.find(
                              (standardTopping) =>
                                standardTopping.type === 'STANDARD' &&
                                standardTopping.name === topping.name
                            )
                        : topping
                    "
                    :checked="
                      !isCreatingPizza &&
                      initialValues.pizzaSizes
                        .filter((p) => p.size === pizza?.value?.size)[0]
                        .standardToppings.some(
                          (standardTopping) =>
                            standardTopping.name === topping.name &&
                            standardTopping.type === 'STANDARD'
                        )
                    "
                  />
                </div>
              </div>

              <div class="pizza-form__title-box">
                <h3 class="pizza-form__title">Pizza Extra Toppings</h3>
              </div>

              <div v-if="pizza.value.size" class="pizza-form__checkbox-row">
                <div
                  v-for="(topping, i) in toppings.filter(
                    (t) =>
                      t.type === 'EXTRA' && t.forPizzaSize === pizza.value.size
                  )"
                  :key="topping.key"
                  class="pizza-form__checkbox-box"
                >
                  <label
                    :for="`id_${topping.type}-${topping.id}`"
                    class="pizza-form__label"
                    >{{ topping.name }}</label
                  >
                  <AddPizzaCheckbox
                    :id="`id_${topping.type}-${topping.id}`"
                    :name="`pizzaSizes[${idx}].extraToppings`"
                    :isCreatingPizza="isCreatingPizza"
                    :value="
                      !isCreatingPizza &&
                      initialValues.pizzaSizes
                        .filter((p) => p.size === pizza?.value?.size)[0]
                        .extraToppings.some(
                          (extraTopping) =>
                            extraTopping.type === 'EXTRA' &&
                            extraTopping.name === topping.name
                        )
                        ? initialValues.pizzaSizes
                            .filter((p) => p.size === pizza?.value?.size)[0]
                            .extraToppings.find(
                              (extraTopping) =>
                                extraTopping.type === 'EXTRA' &&
                                extraTopping.name === topping.name
                            )
                        : topping
                    "
                    :checked="
                      !isCreatingPizza &&
                      initialValues.pizzaSizes
                        .filter((p) => p.size === pizza?.value?.size)[0]
                        .extraToppings.some(
                          (extraTopping) =>
                            extraTopping.type === 'EXTRA' &&
                            extraTopping.name === topping.name
                        )
                    "
                  />
                </div>
              </div>

              <div class="pizza-form__title-box">
                <h5 class="pizza-form__title">
                  Provide Nutritional Value for per 100g
                </h5>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`nutritionalValue.calories_${idx}`"
                    class="pizza-form__label"
                    >Calories</label
                  >
                  <Field
                    type="number"
                    :name="`pizzaSizes[${idx}].nutritionalValue.calories`"
                    :id="`nutritionalValue.calories_${idx}`"
                    class="pizza-form__input"
                    placeholder="Please Enter Calories Amount..."
                    @keydown="handlePreventNonNumbers"
                  />
                  <ErrorMessage
                    :name="`pizzaSizes[${idx}].nutritionalValue.calories`"
                    class="pizza-form__error-message"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :for="`nutritionalValue.fats_${idx}`"
                    class="pizza-form__label"
                    >Fats</label
                  >
                  <Field
                    type="number"
                    :name="`pizzaSizes[${idx}].nutritionalValue.fats`"
                    :id="`nutritionalValue.fats_${idx}`"
                    class="pizza-form__input"
                    placeholder="Please Enter Fats Amount..."
                    @keydown="handlePreventNonNumbers"
                  />
                  <ErrorMessage
                    :name="`pizzaSizes[${idx}].nutritionalValue.fats`"
                    class="pizza-form__error-message"
                  />
                </div>
              </div>
              <div class="pizza-form__row">
                <div class="pizza-form__control">
                  <label
                    :for="`nutritionalValue.proteins_${idx}`"
                    class="pizza-form__label"
                    >Proteins</label
                  >
                  <Field
                    type="number"
                    :name="`pizzaSizes[${idx}].nutritionalValue.proteins`"
                    :id="`nutritionalValue.proteins_${idx}`"
                    class="pizza-form__input"
                    placeholder="Please Enter Proteins Amount..."
                    @keydown="handlePreventNonNumbers"
                  />
                  <ErrorMessage
                    :name="`pizzaSizes[${idx}].nutritionalValue.proteins`"
                    class="pizza-form__error-message"
                  />
                </div>
                <div class="pizza-form__control">
                  <label
                    :id="`nutritionalValue.carbohydrates${idx}`"
                    class="pizza-form__label"
                    >Carbohydrates</label
                  >
                  <Field
                    type="number"
                    :name="`pizzaSizes[${idx}].nutritionalValue.carbohydrates`"
                    :id="`nutritionalValue.carbohydrates${idx}`"
                    class="pizza-form__input"
                    placeholder="Please Enter Carbohydrates Amount..."
                    @keydown="handlePreventNonNumbers"
                  />
                  <ErrorMessage
                    :name="`pizzaSizes[${idx}].nutritionalValue.carbohydrates`"
                    class="pizza-form__error-message"
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </FieldArray>
      </div>
      <div class="pizza-form__btns-box">
        <button
          type="submit"
          class="pizza-form__btn pizza-form__create-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingPizza"> Creating Pizza... </span>
            <span v-else>Editing Pizza...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingPizza"> Create Pizza </span>
            <span v-else> Edit Pizza </span>
          </span>
        </button>
        <button
          type="reset"
          class="pizza-form__btn pizza-form__reset-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          Reset
        </button>
      </div>
    </Form>
  </div>
</template>
  <script setup lang="ts">
import { Form, Field, ErrorMessage, FieldArray } from "vee-validate";
import { v4 as uuid } from "uuid";
import { handlePreventNonNumbers } from "~/utils/handlePreventNumbers";
const props = defineProps([
  "handleFormSubmit",
  "validationSchema",
  "isLoading",
  "isCreatingPizza",
  "initialValues",
  "categories",
  "toppings",
]);

const handleEnableCorrectInput = (evt: any) =>
  ["-", "e", "E"].includes(evt.key) && evt.preventDefault();

const handlePreventFormSubmission = (inputType: string, evt: any) => {
  if (inputType === "number") {
    return handlePreventNonNumbers(evt);
  }
  if (evt.key === "Enter") {
    evt.preventDefault();
  }
};

const filterToppingsByPizzaSize = (
  pizzaSize: string,
  toppingType = "STANDARD"
) => {
  return props.toppings.filter(
    (topp: any) => topp.type === toppingType && topp.forPizzaSize === pizzaSize
  );
};
</script>
  <style scoped>
.pizza__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.pizza-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}
.pizza-form__control {
  margin-bottom: 15px;
}

.pizza-form__checkbox-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 25px;
  margin-bottom: 25px;
}
.pizza-form__checkbox-box {
  margin-bottom: 25px;
}

.pizza-form__checkbox-box .pizza-form__checkbox:after {
  width: 24px;
  height: 24px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #fc8019;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 3px solid #fc8019;
  z-index: 999;
}
.pizza-form__checkbox:checked:after {
  content: "✔";
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
}
.pizza-form__row > * {
  flex: 1;
}
.pizza-form__control {
  position: relative;
}
.pizza-form__file-box {
  margin-bottom: 30px;
}
.pizza-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.pizza-form__input,
.pizza-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.pizza-form__input:not(.pizza-form__select):focus {
  border: 2px solid #fc8019;
}
.pizza-form__select:focus {
  outline-color: #fc8019;
}
.pizza-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.pizza-form__radio-title {
  margin-bottom: 10px;
  font-size: 17px;
  color: #333;
}
.pizza-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.pizza-form__radio-input {
  transform: scale(1.2);
}
.pizza-form__radio-input:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.pizza-form__radio-input:checked:after {
  width: 18px;
  height: 18px;
  border-radius: 18px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.pizza-form__title-box {
  margin-bottom: 15px;
}
.pizza-form__title {
  font-size: 16px;
}
.pizza-form__emergency-box {
  margin-bottom: 25px;
  border: 1px solid #555;
  padding: 10px;
}
.pizza-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.pizza-form__emergency-title {
  margin-bottom: 15px;
  font-size: 15px;
}
.pizza-form__emergency-btns-box {
  display: flex;
  margin-top: 25px;
  align-items: center;
  gap: 20px;
}
.pizza-form__emergency-btn {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
  font-size: 15px;
}
.pizza-form__remove-emergency-btn {
  margin-top: 25px;
}
.pizza-form__emergency-caption {
  margin-bottom: 10px;
}
.pizza-form__emergency-btn {
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}
.pizza-form__remove-emergency-btn:hover,
.pizza-form__add-emergency-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}
.pizza-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.pizza-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.pizza-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.pizza-form__create-btn.active,
.pizza-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.pizza-form__reset-btn {
  border: 2px solid #dedede;
}
.pizza-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .pizza-form__row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 25px;
    margin-bottom: 25px;
  }
  .pizza-form__control {
    margin-bottom: 0;
  }
  .pizza-form__checkbox-row {
    margin-bottom: 50px;
  }
  .pizza-form__checkbox-box {
    margin-bottom: 0;
  }
  .pizza-form__label {
    font-size: 15px;
  }
  .pizza-form__input,
  .pizza-form__file-input {
    padding: 15px 5px;
  }
  .pizza-form__title {
    font-size: 20px;
  }
  .pizza-form__emergency-title {
    font-size: 20px;
  }
  .pizza-form__btn {
    padding: 15px 25px;
    font-size: 16px;
  }
  .pizza-form__error-message {
    position: absolute;
  }
}
</style>