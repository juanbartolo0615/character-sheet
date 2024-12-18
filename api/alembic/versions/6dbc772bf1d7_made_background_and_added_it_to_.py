"""made background and added it to character

Revision ID: 6dbc772bf1d7
Revises: 5a1d366ade3a
Create Date: 2024-10-25 02:44:51.009969

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6dbc772bf1d7'
down_revision: Union[str, None] = '5a1d366ade3a'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('background',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('feature', sa.String(), nullable=False),
    sa.Column('feature_description', sa.String(), nullable=False),
    sa.Column('proficiencies', sa.String(), nullable=False),
    sa.Column('languages', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column('characters', sa.Column('background', sa.Integer(), nullable=False))
    op.create_foreign_key(None, 'characters', 'background', ['background'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'characters', type_='foreignkey')
    op.drop_column('characters', 'background')
    op.drop_table('background')
    # ### end Alembic commands ###
