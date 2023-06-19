/** @param  {import('knex').Knex} knex*/
export const up = async knex => {

  await knex.raw(
  `CREATE TABLE public.words (
    id integer NOT NULL,
    word character varying(50) NOT NULL,
    pronunciation character varying(50) NOT NULL,
    lexical_category character varying(20) NOT NULL,
    common_phrases text[],
    usage_examples text[],
    synonyms character varying(50)[],
    created_at timestamp with time zone DEFAULT now(),
    meaning text[]
);

CREATE SEQUENCE public.words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
    
    ALTER SEQUENCE public.words_id_seq OWNED BY public.words.id;
    
    ALTER TABLE ONLY public.words ALTER COLUMN id SET DEFAULT nextval('public.words_id_seq'::regclass);`
    )
  
await knex.raw(
`CREATE TABLE public.words_forms (
  id integer NOT NULL,
  initial integer NOT NULL,
  form character varying(50) NOT NULL
);

CREATE SEQUENCE public.words_forms_id_seq
 AS integer
 START WITH 1
 INCREMENT BY 1
 NO MINVALUE
 NO MAXVALUE
 CACHE 1;

 ALTER SEQUENCE public.words_forms_id_seq OWNED BY public.words_forms.id;
 
 ALTER TABLE ONLY public.words_forms ALTER COLUMN id SET DEFAULT nextval('public.words_forms_id_seq'::regclass);`
 )

await knex.raw(
`CREATE MATERIALIZED VIEW public.words_cards AS
WITH forms AS (
  SELECT words_forms.initial,
      array_agg(words_forms.form) AS forms
    FROM public.words_forms
    GROUP BY words_forms.initial
  ), initials AS (
  SELECT words.word,
      words.id
    FROM public.words
  )
SELECT w.id,
   w.word,
   w.pronunciation,
   w.lexical_category,
   w.common_phrases,
   w.usage_examples,
   w.meaning,
   w.synonyms,
   f.forms,
   w.created_at
  FROM (public.words w
    JOIN forms f ON ((f.initial = w.id)))
 WITH NO DATA;`
 )

 await knex.raw(
  `ALTER TABLE ONLY public.words_forms
  ADD CONSTRAINT words_forms_pkey PRIMARY KEY (id);
  
  ALTER TABLE ONLY public.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);
    
  ALTER TABLE ONLY public.words_forms
  ADD CONSTRAINT initial FOREIGN KEY (initial) REFERENCES public.words(id) ON UPDATE CASCADE ON DELETE CASCADE;`
  )
}

/** @param  {import('knex').Knex} knex*/
export const down = async knex => {
  await knex.schema.dropMaterializedViewIfExists('words_cards')
  await knex.schema.dropTableIfExists('words_forms')
  await knex.schema.dropTableIfExists('words')
}
