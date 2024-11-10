'use client'
import { ReactNode, useEffect, useState } from 'react';
import { FormValuesStep5 } from '@/interfaces';
import { ErrorForm, LabelForm, SectionForm, TitleForm, SortableItem } from '@/components';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SelectChangeEvent, TextField } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Props {
  errors: FormikErrors<FormValuesStep5>;
  touched: FormikTouched<FormValuesStep5>;
  values: FormValuesStep5;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  setFieldValue: (field: string, value: unknown) => void;
}

export const Step5 = ({ errors, touched, values, handleChange, setFieldValue }: Props) => {

  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    setItems(values.q22.length > 0 ? values.q22 : ["Price", "Recommendations and references", "Quality of the provider's portfolio", "Previous relationship with the provider", "Value proposition and differentiation"]);
  }, [values.q22])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof FormValuesStep5] as unknown as string[];

    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value));
    } else {
      setFieldValue(name, [...currentValues, value]);
    }
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q21Other", event.target.value);
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
  
    if (over) {
      const activeId = active.id as string
      const overId = over.id as string
  
      if (activeId !== overId) {
        const oldIndex = items.indexOf(activeId);
        const newIndex = items.indexOf(overId);
  
        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = arrayMove(items, oldIndex, newIndex);
          setItems(newItems);
          setFieldValue("q22", newItems);
        }
      }
    }
  }

  return (
    <>
      <TitleForm title='Budget and Purchase Decision' />
      <SectionForm>
        <LabelForm label='What is the budget range your company allocates or would be willing to allocate for web development and branding services?'/>
        <RadioGroup name="q20" value={values.q20} onChange={handleChange}>
          {['Less than $2,000', '$2,000 - $5,000', '$5,001 - $10,000', 'More than $10,000', 'Depends on perceived value'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        {touched.q20 && errors.q20 && <ErrorForm label={errors.q20} />}
      </SectionForm>
      
      <SectionForm>
        <LabelForm label='Who are the main decision-makers for hiring digital services in your company? (You may select more than one)'/>
        <FormGroup>
          {["Owner / CEO", "Marketing Manager", "IT Manager", "Purchasing Team", "Other"].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q21" value={label} checked={values.q21.includes(label)} onChange={handleCheckboxChange} />}
              label={label}
              key={label}
            />
          ))}
        </FormGroup>
        {values.q21.some((item) => item.startsWith("Other")) && (
          <TextField id="q21Other" label="Please specify" value={values.q21Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        {touched.q21 && errors.q21 && <ErrorForm label={errors.q21} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='Which factors most influence the final hiring decision? (Rank from 1 to 5, with 1 being the most influential)'/>
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            <ul>
              {items.map((label, index) => (
                <SortableItem key={label} id={label} index={index} label={label} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </SectionForm>
    </>
  )
}
