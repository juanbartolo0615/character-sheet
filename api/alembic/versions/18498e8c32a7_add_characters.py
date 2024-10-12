"""add characters

Revision ID: 18498e8c32a7
Revises: 4ed75a8a01da
Create Date: 2024-10-09 20:24:24.742310

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '18498e8c32a7'
down_revision: Union[str, None] = '4ed75a8a01da'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('races',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=20), nullable=False),
    sa.Column('hashed_password', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('racialTraits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('race_id', sa.Integer(), nullable=False),
    sa.Column('trait', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['race_id'], ['races.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subraces',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('race_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['race_id'], ['races.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('characters',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('race_id', sa.Integer(), nullable=False),
    sa.Column('subrace_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['race_id'], ['races.id'], ),
    sa.ForeignKeyConstraint(['subrace_id'], ['subraces.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('subracesTraits',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('subrace_id', sa.Integer(), nullable=False),
    sa.Column('trait', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.ForeignKeyConstraint(['subrace_id'], ['subraces.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('subracesTraits')
    op.drop_table('characters')
    op.drop_table('subraces')
    op.drop_table('racialTraits')
    op.drop_table('users')
    op.drop_table('races')
    # ### end Alembic commands ###