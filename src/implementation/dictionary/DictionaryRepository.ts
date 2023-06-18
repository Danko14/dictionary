import { Knex } from 'knex'
import assert from 'node:assert/strict'
import { IGenericRepository } from '../../interfaces/IGenericRepository.js'
import { FormEntry, WordEntry } from '../../entities/WordEntry.js'
import { IWordSpecification } from '../../interfaces/IWordSpecification.js'
import { PaginatedList, WordsListItem } from '../../types/common.js'
import { NotFoundError } from '../../errors/domain/index.js'

class RowDataMapper {
    static map(row): WordEntry {
        return new WordEntry({
            id: row.id,
            initialForm: row.word,
            meaning: row.meaning,
            pronunciation: row.pronunciation,
            lexicalCategory: row.lexical_category,
            commonPhrases: row.common_phrases,
            usageExamples: row.usage_examples,
            synonyms: row.synonyms,
            forms: row.forms,
            createdAt: row.created_at,
        })
    }
}

class WordsEntityMapper {
    static map(entity: WordEntry) {
        return {
            word: entity.initialForm,
            meaning: entity.meaning,
            pronunciation: entity.pronunciation,
            lexical_category: entity.lexicalCategory,
            common_phrases: entity.commonPhrases,
            usage_examples: entity.usageExamples,
            synonyms: entity.synonyms,
            created_at: entity.createdAt,
        }
    }
}

class FormsEntityMapper {
    static map(entity: WordEntry) {
        return entity.forms.map(x => ({ initial: entity.id, form: x }))
    }
}

class FormsRowMapper {
    static map(row): FormEntry {
        return new FormEntry({
            id: row.id,
            initial: row.initial,
            form: row.form,
        })
    }
}

class ListDataMapper {
    static map(row): WordsListItem {
        return {
            id: row.id,
            word: row.word,
        }
    }
}

export class DictionaryRepository implements IGenericRepository<WordEntry, IWordSpecification> {
    knex: Knex

    constructor(deps: { knex: Knex }) {
        this.knex = deps.knex
    }

    async getOne(specification: IWordSpecification, table: string): Promise<WordEntry | FormEntry> {
        const query = this.knex.table(table)

        if (specification.getId()) query.where('id', specification.getId())
        if (specification.getWord()) query.andWhere('form', specification.getWord())

        const row = await query.first()

        assert(row, new NotFoundError())

        return table === 'words_cards' ? RowDataMapper.map(row) : FormsRowMapper.map(row)
    }

    async getList(specification: IWordSpecification): Promise<PaginatedList<WordsListItem>> {
        const query = this.knex.table('words_cards')
        const { count } = await query.clone().count('id').first()

        query.select('id', 'word')
        if (specification.getLimit()) query.limit(specification.getLimit())
        if (specification.getOffset()) query.offset(specification.getOffset())
        query.orderBy('created_at', 'desc')

        const rows = await query

        return {
            total: count,
            items: rows.map(ListDataMapper.map),
        }
    }

    async createOne(record: WordEntry, table: string): Promise<WordEntry> {
        const [row] = await this.knex
            .table(table)
            .insert(WordsEntityMapper.map(record))
            .onConflict(['id']).merge()
            .returning('*')
        return RowDataMapper.map(row)
    }

    async createMany(record: WordEntry, table: string): Promise<FormEntry[]> {
        const rows = await this.knex
            .table(table)
            .insert(FormsEntityMapper.map(record))
            .onConflict(['id']).merge()
            .returning('*')

        await this.knex.schema.refreshMaterializedView('words_cards')

        return rows.map(FormsRowMapper.map)
    }

    async deleteOne(specification: IWordSpecification): Promise<void> {
        const query = this.knex.table('words')
        if (specification.getId()) query.where('id', specification.getId())
        if (specification.getWord()) query.where('word', specification.getWord())
        query.del()

        await query
    }
}
