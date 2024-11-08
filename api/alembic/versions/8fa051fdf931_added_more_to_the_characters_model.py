""" added more to the characters model

Revision ID: 8fa051fdf931
Revises: 74429beaa70c
Create Date: 2024-11-06 16:50:40.065904

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8fa051fdf931'
down_revision: Union[str, None] = '74429beaa70c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('characters', sa.Column('hitpoints', sa.Integer(), nullable=False))
    op.add_column('characters', sa.Column('feet', sa.Integer(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('characters', 'feet')
    op.drop_column('characters', 'hitpoints')
    # ### end Alembic commands ###