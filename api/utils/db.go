package utils

import (
	"gorm.io/gen"
)

type Pagination struct {
	Page  int
	Size  int
	Total int
	Next  *int // can be null
	Prev  *int // can be null
}

func Paginate(p *Pagination) func(gen.Dao) gen.Dao {
	offset := (p.Page - 1) * p.Size

	return func(d gen.Dao) gen.Dao {
		total, err := d.Count()

		if err != nil {
			p.Total = offset
		} else {
			p.Total = int(total)
		}

		if p.Page > 1 {
			prev := p.Page - 1
			p.Prev = &prev
		}

		if p.Total > p.Page*p.Size {
			next := p.Page + 1
			p.Next = &next
		}

		return d.Offset(offset).Limit(p.Size)
	}
}
