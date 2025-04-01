"""attempt 2 all model migration

Revision ID: 0e709878ecd6
Revises: 5ef633faaebb
Create Date: 2025-04-01 17:51:51.754010

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0e709878ecd6'
down_revision = '5ef633faaebb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('moods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('emoji', sa.String(length=10), nullable=False),
    sa.Column('score', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_moods'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(length=128), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('email', name=op.f('uq_users_email')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('journals',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=30), nullable=False),
    sa.Column('year', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('color', sa.String(length=7), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_journals_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_journals')),
    sa.UniqueConstraint('title', name=op.f('uq_journals_title'))
    )
    op.create_table('entries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('main_text', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.Column('journal_id', sa.Integer(), nullable=False),
    sa.Column('ai_prompt_used', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['journal_id'], ['journals.id'], name=op.f('fk_entries_journal_id_journals')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_entries')),
    sa.UniqueConstraint('main_text', name=op.f('uq_entries_main_text')),
    sa.UniqueConstraint('title', name=op.f('uq_entries_title'))
    )
    op.create_table('entry_moods',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('entry_id', sa.Integer(), nullable=False),
    sa.Column('mood_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['entry_id'], ['entries.id'], name=op.f('fk_entry_moods_entry_id_entries')),
    sa.ForeignKeyConstraint(['mood_id'], ['moods.id'], name=op.f('fk_entry_moods_mood_id_moods')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_entry_moods')),
    sa.UniqueConstraint('entry_id', 'mood_id', name='unique_entry_mood')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('entry_moods')
    op.drop_table('entries')
    op.drop_table('journals')
    op.drop_table('users')
    op.drop_table('moods')
    # ### end Alembic commands ###
