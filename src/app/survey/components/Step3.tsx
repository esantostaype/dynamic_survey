'use client'
import { ReactNode, useEffect, useState } from 'react';
import { FormValuesStep3 } from '@/interfaces';
import { ErrorForm, LabelForm, SectionForm, TitleForm, SortableItem } from '@/components';
import { Checkbox, FormControlLabel, FormGroup, Radio, RadioGroup, SelectChangeEvent, TextField } from '@mui/material';
import { FormikErrors, FormikTouched } from 'formik';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface Props {
  errors: FormikErrors<FormValuesStep3>;
  touched: FormikTouched<FormValuesStep3>;
  values: FormValuesStep3;
  handleChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
  setFieldValue: (field: string, value: unknown) => void;
}

export const Step3 = ({ errors, touched, values, handleChange, setFieldValue }: Props) => {

  const [items, setItems] = useState<string[]>([])

  useEffect(() => {
    setItems(values.q11.length > 0 ? values.q11 : ["Cost", "Design quality", "Customized functionalities", "Delivery time", "Customer service and support"]);
  }, [values.q11])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const currentValues = values[name as keyof FormValuesStep3] as unknown as string[];

    if (currentValues.includes(value)) {
      setFieldValue(name, currentValues.filter((v) => v !== value));
    } else {
      setFieldValue(name, [...currentValues, value]);
    }
  }

  const handleOtherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q10Other", event.target.value);
  }

  const handleQ12ExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q12Explain", event.target.value);
  }

  const handleQ14ExplainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue("q14Explain", event.target.value);
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
          setFieldValue("q11", newItems);
        }
      }
    }
  }

  return (
    <>
      <TitleForm title='Digital Needs and Preferences' />
      <SectionForm>
        <LabelForm label='How important is it for your company to improve or develop its digital presence in the next 12 months?'/>
        <RadioGroup name="q9" value={values.q9} onChange={handleChange}>
          {['Very important', 'Important', 'Moderately important', 'Slightly important', 'Not important'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        {touched.q9 && errors.q9 && <ErrorForm label={errors.q9} />}
      </SectionForm>
      
      <SectionForm>
        <LabelForm label='What are the main reasons for investing in web development or branding? (You may select more than one)'/>
        <FormGroup>
          {["Increase brand visibility", "Improve customer experience", "Increase sales or leads", "Differentiate from competitors", "Modernize the company's image", "Other"].map((label) => (
            <FormControlLabel
              control={<Checkbox name="q10" value={label} checked={values.q10.includes(label)} onChange={handleCheckboxChange} />}
              label={label}
              key={label}
            />
          ))}
        </FormGroup>
        {values.q10.some((item) => item.startsWith("Other")) && (
          <TextField id="q10Other" label="Please specify" value={values.q10Other} onChange={handleOtherChange} fullWidth margin="normal"/>
        )}
        {touched.q10 && errors.q10 && <ErrorForm label={errors.q10} />}
      </SectionForm>

      <SectionForm>
        <LabelForm label='When considering developing or renewing your website, which factors are most important to you? (Rank from 1 to 5, with 1 being the most important)'/>
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
      
      <SectionForm>
        <LabelForm label='Do you prefer to use pre-designed templates or custom solutions for your website?'/>
        <RadioGroup name="q12" value={values.q12} onChange={handleChange}>
          {['Pre-designed templates', 'Custom solutions', 'Indifferent'].map((label) => (
            <FormControlLabel key={label} value={label} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
        <TextField
          id="q12Explain"
          multiline
          rows={2}
          maxRows={4}
          fullWidth
          label="Please briefly explain your choice:"
          margin='normal'
          value={values.q12Explain}
          onChange={handleQ12ExplainChange}
        />
        {touched.q12 && errors.q12 && <ErrorForm label={errors.q12} />}
      </SectionForm>
      <SectionForm>
        <LabelForm label="Have you had previous experiences with web agencies or developers?"/>
        <RadioGroup row name="q13" value={ values.q13 } onChange={ handleChange }>
          {['Yes', 'No'].map(( label ) => (
            <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
          ))}
        </RadioGroup>
        { touched.q13 && errors.q13 && <ErrorForm label={ errors.q13 } />}
      </SectionForm>
      { values.q13 === 'Yes' && (
        <SectionForm>
          <LabelForm label="Rate your overall satisfaction with those experiences:"/>
          <RadioGroup name="q14" value={ values.q14 } onChange={ handleChange }>
            {["Very satisfied", "Satisfied", "Neutral", "Unsatisfied", "Very unsatisfied"].map(( label ) => (
              <FormControlLabel key={ label } value={ label } control={<Radio />} label={ label } />
            ))}
          </RadioGroup>
          <TextField
            id="q14Explain"
            multiline
            rows={2}
            maxRows={4}
            fullWidth
            label="Please share what aspects were positive or negative:"
            margin='normal'
            value={values.q14Explain}
            onChange={handleQ14ExplainChange}
          />
          { touched.q14 && errors.q14 && <ErrorForm label={ errors.q14 } />}
        </SectionForm>
      )}
    </>
  )
}
