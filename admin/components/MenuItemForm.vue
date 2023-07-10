<template>
  <div class="menu-item__form-box">
    <Form
      @submit="handleFormSubmit"
      class="menu-item-form"
      :validation-schema="validationSchema"
      :initial-values="initialValues"
    >
      <div class="menu-item-form__row">
        <div class="menu-item-form__control">
          <label for="name" class="menu-item-form__label">Name</label>
          <Field
            type="text"
            class="menu-item-form__input"
            id="name"
            name="name"
            placeholder="Add Menu Item Name..."
          />
          <ErrorMessage name="name" class="menu-item-form__error-message" />
        </div>
        <div class="menu-item-form__control">
          <label for="description" class="menu-item-form__label"
            >Description</label
          >
          <Field
            type="text"
            class="menu-item-form__input"
            id="description"
            name="description"
            placeholder="Add Menu Item Description..."
          />
          <ErrorMessage
            name="description"
            class="menu-item-form__error-message"
          />
        </div>
      </div>

      <div class="menu-item-form__row">
        <div class="menu-item-form__control">
          <label for="categoryId" class="menu-item-form__label"
            >Choose Category</label
          >
          <Field
            as="select"
            class="menu-item-form__input"
            id="categoryId"
            name="categoryId"
          >
            <option value="">Select Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </Field>
          <ErrorMessage
            name="categoryId"
            class="menu-item-form__error-message"
          />
        </div>
        <div class="menu-item-form__control">
          <label for="type" class="menu-item-form__label"
            >Choose Menu Type</label
          >
          <Field
            as="select"
            class="menu-item-form__input"
            id="type"
            name="type"
          >
            <option value="">Select Menu Item Type</option>
            <option value="SNACKS">Snacks</option>
            <option value="DRINKS">Drinks</option>
            <option value="DESSERTS">Desserts</option>
            <option value="SALADS">Salads</option>
          </Field>
          <ErrorMessage name="type" class="menu-item-form__error-message" />
        </div>
      </div>
      <div class="menu-item-form__row">
        <div class="menu-item-form__control">
          <label for="spiceLevel" class="menu-item-form__label"
            >Choose Spice Level</label
          >
          <Field
            as="select"
            class="menu-item-form__input"
            id="spiceLevel"
            name="spiceLevel"
          >
            <option value="">Select Spice Level</option>
            <option value="NOT_SPICY">Not Spicy</option>
            <option value="MILD">Mild</option>
            <option value="HOT">Hot</option>
          </Field>
          <ErrorMessage
            name="spiceLevel"
            class="menu-item-form__error-message"
          />
        </div>
      </div>

      <div class="menu-item-form__nutritional-value-box">
        <h5 class="menu-item-form__nutritional-value-title">
          Provide Nutritional Value for per 100g
        </h5>
      </div>
      <div class="menu-item-form__row">
        <div class="menu-item-form__control">
          <label for="calories" class="menu-item-form__label">Calories</label>
          <Field
            type="number"
            name="calories"
            id="calories"
            class="menu-item-form__input"
            placeholder="Please Enter Calories Amount..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="calories" class="menu-item-form__error-message" />
        </div>
        <div class="menu-item-form__control">
          <label for="fats" class="menu-item-form__label">Fats</label>
          <Field
            type="number"
            name="fats"
            id="fats"
            class="menu-item-form__input"
            placeholder="Please Enter Fats Amount..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="fats" class="menu-item-form__error-message" />
        </div>
      </div>
      <div class="menu-item-form__row">
        <div class="menu-item-form__control">
          <label for="proteins" class="menu-item-form__label">Proteins</label>
          <Field
            type="number"
            name="proteins"
            id="proteins"
            class="menu-item-form__input"
            placeholder="Please Enter Calories Amount..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage name="proteins" class="menu-item-form__error-message" />
        </div>
        <div class="menu-item-form__control">
          <label for="carbohydrates" class="menu-item-form__label"
            >Carbohydrates</label
          >
          <Field
            type="number"
            name="carbohydrates"
            id="carbohydrates"
            class="menu-item-form__input"
            placeholder="Please Enter Fats Amount..."
            @keydown="handlePreventNonNumbers"
          />
          <ErrorMessage
            name="carbohydrates"
            class="menu-item-form__error-message"
          />
        </div>
      </div>
      <div class="menu-item-form__control">
        <div class="menu-item-form__radio-box">
          <p class="menu-item-form__radio-title">
            Choose Either Vegan or Non-Vegan
          </p>
          <div class="menu-item-form__radio-text-box">
            <label for="vegan" class="menu-item-form__radio-label"
              >Vegan
              <Field
                type="radio"
                class="menu-item-form__radio-input"
                id="vegan"
                name="vegan"
                :value="true"
              />
            </label>
            <label for="non-vegan" class="menu-item-form__radio-label"
              >Non-Vegan
              <Field
                type="radio"
                class="menu-item-form__radio-input"
                id="non-vegan"
                name="vegan"
                :value="false"
              />
            </label>
          </div>
          <ErrorMessage name="vegan" class="menu-item-form__error-message" />
        </div>
      </div>
      <div class="menu-item-form__control menu-item-form__piece-box">
        <p class="menu-item-form__menu-item-title">Add a Menu Item Piece</p>
        <FieldArray name="pieces" v-slot="{ fields, push, remove }">
          <div
            v-for="(piece, idx) in fields"
            :key="piece.key"
            class="menu-item-form__menu-item-box"
          >
            <fieldset>
              <figcaption class="menu-item-form__menu-item-caption">
                Menu Item Piece {{ idx + 1 }}
              </figcaption>
              <div class="menu-item-form__file-box">
                <img
                  v-if="initialValues.pieces[idx]?.photo"
                  :src="initialValues.pieces[idx]?.photo"
                  class="menu-item-form__img"
                  :alt="initialValues.name"
                />
                <label :for="`photo_${idx}`" class="menu-item-form__label"
                  >Upload Menu Item Photo</label
                >
                <Field
                  type="file"
                  class="menu-item-form__input menu-item-form__file-input"
                  :id="`photo_${idx}`"
                  :name="`pieces[${idx}].photo`"
                />
                <ErrorMessage
                  :name="`pieces[${idx}].photo`"
                  class="menu-item-form__error-message"
                />
              </div>
              <div class="menu-item-form__row">
                <div class="menu-item-form__control">
                  <label :for="`amount_${idx}`" class="menu-item-form__label"
                    >Amount</label
                  >
                  <Field
                    type="string"
                    class="menu-item-form__input"
                    :id="`amount_${idx}`"
                    :name="`pieces[${idx}].amount`"
                    placeholder="Menu Item Piece Amount.."
                  />
                  <ErrorMessage
                    class="menu-item-form__error-message"
                    :name="`pieces[${idx}].amount`"
                  />
                </div>
                <div class="menu-item-form__control">
                  <label :for="`price_${idx}`" class="menu-item-form__label"
                    >Price</label
                  >
                  <Field
                    type="number"
                    class="menu-item-form__input"
                    :id="`price_${idx}`"
                    :name="`pieces[${idx}].price`"
                    placeholder="Menu Item Piece price.."
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="menu-item-form__error-message"
                    :name="`pieces[${idx}].price`"
                  />
                </div>
              </div>
              <div class="menu-item-form__row">
                <div class="menu-item-form__control">
                  <label :for="`size_${idx}`" class="menu-item-form__label"
                    >Choose menu item piece size</label
                  >

                  <Field
                    as="select"
                    class="menu-item-form__input"
                    :id="`size_${idx}`"
                    :name="`pieces[${idx}].size`"
                    placeholder="Contact name"
                  >
                    <option value="">Seelct Piece Size</option>
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </Field>
                  <ErrorMessage
                    class="menu-item-form__error-message"
                    :name="`pieces[${idx}].size`"
                  />
                </div>
                <div class="menu-item-form__control">
                  <label :for="`weight_${idx}`" class="menu-item-form__label"
                    >Weight In Gramm</label
                  >
                  <Field
                    type="number"
                    class="menu-item-form__input"
                    :id="`weight_${idx}`"
                    :name="`pieces[${idx}].weight`"
                    placeholder="Menu Item Piece Weight.."
                    @keydown="handlePreventFormSubmission('', $event)"
                  />
                  <ErrorMessage
                    class="menu-item-form__error-message"
                    :name="`pieces[${idx}].weight`"
                  />
                </div>
              </div>
            </fieldset>
            <button
              @click="remove(idx)"
              class="menu-item-form__menu-item-btn menu-item-form__remove-menu-item-btn"
            >
              Remove
            </button>
          </div>
          <div class="menu-item-form__menu-item-btns-box">
            <button
              v-if="fields.length < 3"
              class="menu-item-form__menu-item-btn menu-item-form__add-menu-item-btn"
              @click.stop="
                push({
                  id: uuid(),
                  photo: '',
                  weight: '',
                  size: '',
                  price: '',
                })
              "
            >
              Add Menu Item Piece
            </button>
          </div>
        </FieldArray>
      </div>
      <div class="menu-item-form__btns-box">
        <button
          type="submit"
          class="menu-item-form__btn menu-item-form__create-btn"
          :disabled="isLoading"
          :class="{ active: isLoading }"
        >
          <span v-if="isLoading">
            <span v-if="isCreatingMenuItem"> Creating Menu Item... </span>
            <span v-else>Editing Menu Item...</span>
          </span>
          <span v-else>
            <span v-if="isCreatingMenuItem"> Create Menu Item </span>
            <span v-else> Edit Menu Item </span>
          </span>
        </button>
        <button
          type="reset"
          class="menu-item-form__btn menu-item-form__reset-btn"
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
defineProps([
  "handleFormSubmit",
  "validationSchema",
  "isLoading",
  "isCreatingMenuItem",
  "initialValues",
  "categories",
]);

const handlePreventFormSubmission = (inputType: string, evt: any) => {
  if (inputType === "number") {
    return handlePreventNonNumbers(evt);
  }
  if (evt.key === "Enter") {
    evt.preventDefault();
  }
};
</script>
  <style scoped>
.menu-item__form-box {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.menu-item-form__img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  cursor: pointer;
}
.menu-item-form__row > * {
  flex: 1;
}
.menu-item-form__control {
  position: relative;
  margin-bottom: 15px;
}
.menu-item-form__radio-box {
  margin: 15px 0;
}
.menu-item-form__radio-text-box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.menu-item-form__piece-box {
  margin: 30px 0 20px 0;
}
.menu-item-form__file-box {
  margin-bottom: 30px;
}
.menu-item-form__label {
  font-size: 13px;
  color: #333;
  display: block;
  padding-bottom: 5px;
}
.menu-item-form__input,
.menu-item-form__file-input {
  display: block;
  width: 100%;
  padding: 8px 3px;
  border-radius: 5px;
  border: 2px solid #999;
}
.menu-item-form__input:not(.menu-item-form__select):focus {
  border: 2px solid #fc8019;
}
.menu-item-form__select:focus {
  outline-color: #fc8019;
}
.menu-item-form__error-message {
  font-size: 14px;
  color: rgb(247, 63, 63);
  font-weight: 600;
}
.menu-item-form__radio-box {
  margin: 30px 0 10px 0;
}
.menu-item-form__radio-title {
  margin-bottom: 5px;
  font-size: 15px;
  color: #333;
}
.menu-item-form__radio-label {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-right: 15px;
}
.menu-item-form__radio-input {
  transform: scale(1.2);
}
.menu-item-form__radio-input:after {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #d1d3d1;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

.menu-item-form__radio-input:checked:after {
  width: 20px;
  height: 20px;
  border-radius: 5px;
  top: -2px;
  left: -2px;
  position: relative;
  background-color: #ffa500;
  content: "";
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
.menu-item-form__menu-item-box {
  margin-bottom: 50px;
  padding: 10px;
  border: 1px solid #555;
}
.menu-item-form__nutritional-value-box {
  margin: 40px 0 10px;
}
.menu-item-form__btns-box {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 50px;
}
.menu-item-form__menu-item-title {
  margin-bottom: 15px;
  font-size: 16px;
}
.menu-item-form__menu-item-btns-box {
  margin-top: 25px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.menu-item-form__menu-item-btn {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border: 1px solid #333;
  font-size: 13px;
}

.menu-item-form__menu-item-caption {
  margin-bottom: 10px;
}
.menu-item-form__menu-item-btn {
  padding: 10px 20px;
  border-radius: 5px;
  transition: all 0.3s ease-out;
}

.menu-item-form__remove-menu-item-btn:hover,
.menu-item-form__add-menu-item-btn:hover {
  background: rgba(0, 0, 0, 0.05);
}
.menu-item-form__btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 600;
}
.menu-item-form__create-btn {
  background: #fc8019;
  border: 2px solid #fc8019;
  color: #fff;
}
.menu-item-form__create-btn:not(.active):hover {
  background: hsl(27, 97%, 50%);
}
.menu-item-form__create-btn.active,
.menu-item-form__reset-btn.active {
  opacity: 0.5;
  cursor: not-allowed;
}
.menu-item-form__reset-btn {
  border: 2px solid #dedede;
}
.menu-item-form__reset-btn:not(.active):hover {
  background: #e7e7e7;
  color: #333;
}

@media (min-width: 992px) {
  .menu-item-form__row {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 30px;
  }
  .menu-item-form__control {
    margin-bottom: 0;
  }
  .menu-item-form__label {
    font-size: 15px;
  }
  .menu-item-form__input,
  .menu-item-form__file-input {
    padding: 15px 5px;
  }
  .menu-item-form__radio-title {
    font-size: 17px;
  }
  .menu-item-form__menu-item-title {
    font-size: 20px;
  }
  .menu-item-form__btn {
    padding: 15px 25px;
    font-size: 16px;
  }
  .menu-item-form__menu-item-btn {
    font-size: 15px;
  }
  .menu-item-form__error-message {
    position: absolute;
  }
}
</style>